import { useMutation, useQuery } from "@apollo/client";
import { useField } from "../hooks";
import { ALL_AUTHORS } from "../queries";
import { EDIT_AUTHOR } from "../queries";

const Authors = () => {
  const name = useField("text");
  const born = useField("number");
  const result = useQuery(ALL_AUTHORS);

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault();

    changeAuthor({
      variables: {
        name: name.input.value,
        setBornTo: parseInt(born.input.value),
      },
    });

    born.reset();
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:{" "}
          <select {...name.input}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born: <input {...born.input} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
