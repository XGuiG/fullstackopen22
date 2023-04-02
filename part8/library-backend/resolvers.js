const { GraphQLError } = require("graphql");
const { countBy } = require("lodash");
const Author = require("./models/authors");
const Book = require("./models/books");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    searchBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");

      const genreBooks = args.genre
        ? books.filter((b) => b.genres.find((g) => g === args.genre))
        : books;
      return args.author
        ? genreBooks.filter((b) => b.author.name === args.author)
        : genreBooks;
    },
    allBooks: async () => Book.find({}).populate("author"),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const books = await Book.find({}).populate("author");
      const authors = await Author.find({});

      const counts = countBy(books, (book) => book.author.id);
      const authorsCountById = Object.entries(counts).map(([key, value]) => ({
        id: key,
        bookCount: value,
      }));

      const authorBookCount = authors.map((a) => {
        const authorCount = authorsCountById.find((n) => n.id === a.id);
        a.bookCount = authorCount.bookCount;
        return a;
      });

      return authorBookCount;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    favoriteGenre: async (root, args, context) => {
      const books = await Book.find({}).populate("author");

      const favorite = context.currentUser.favoriteGenre;

      return books.filter((b) => b.genres.find((g) => g === favorite));
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        const newAuthor = new Author({ name: args.author, born: null, bookCount: null });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }

        return (author = newAuthor);
      }

      const book = new Book({ ...args, author: author.id });
      try {
        await book.save();
        const newBook = await Book.findById(book.id).populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args, bookCount: null });
      return author.save();
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving born failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new Userforbook({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await Userforbook.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
