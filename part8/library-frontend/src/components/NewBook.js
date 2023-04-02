import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { CREATE_BOOK } from "../queries";
import { updateCache } from "../App";

const NewBook = () => {
  const title = useField("text");
  const author = useField("text");
  const published = useField("number");
  const genre = useField("text");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onCompleted: () => {
      navigate("/books");
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
  });

  // useEffect(() => {
  //   if (result.data) {
  //     navigate("/books");
  //   }
  // }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: {
        title: title.input.value,
        author: author.input.value,
        published: parseInt(published.input.value),
        genres: genres,
      },
    });

    title.reset();
    author.reset();
    published.reset();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.input.value));
    genre.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title:
          <input {...title.input} />
        </div>
        <div>
          author:
          <input {...author.input} />
        </div>
        <div>
          published:
          <input {...published.input} />
        </div>
        <div>
          <input {...genre.input} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
