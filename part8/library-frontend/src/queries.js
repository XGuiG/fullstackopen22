import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
    id
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GENRE_BOOKS = gql`
  query searchBooks($author: String, $genre: String) {
    searchBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const FAVORITE_GENRE = gql`
  query recommend {
    favoriteGenre {
      ...BookDetails
    }
    me {
      favoriteGenre
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
