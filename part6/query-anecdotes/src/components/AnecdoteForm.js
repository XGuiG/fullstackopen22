import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import NotificationContext from "../Context";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const [_, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onError: (error) => {
      dispatch({ type: "ERROR", errorMessage: error.response.data.error });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("anecodotes");
    },
  });
  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
    dispatch({ type: "CREATE", anecdote: content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
