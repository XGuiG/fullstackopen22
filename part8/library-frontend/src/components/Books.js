import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GENRE_BOOKS } from "../queries";

const Books = ({books}) => {
  const [value, setValue] = useState("");
  const result = useQuery(GENRE_BOOKS, {
    variables: {
      genre: value,
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  let genrebooks = books.map((b) => b.genres);
  let flatArr = genrebooks.reduce((acc, val) => acc.concat(val), []);
  let uniqueArr = flatArr.filter(
    (val, index) => flatArr.indexOf(val) === index
  );

  return (
    <div>
      <h2>books</h2>
      {value? <div>in genre <strong>{value}</strong></div>  : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.searchBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueArr.map(u => (<button key={u} value={u} onClick={() => setValue(u)}>{u}</button>))}
    </div>
  );
};

export default Books;
