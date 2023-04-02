import { useQuery } from "@apollo/client";
import { FAVORITE_GENRE } from "../queries";
import { useState } from "react";

const Recommend = () => {
  const result = useQuery(FAVORITE_GENRE)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your genre <strong>{result.data.me.favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.favoriteGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend
