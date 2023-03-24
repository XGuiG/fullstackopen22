import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes, { retry: 1 });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  } else if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
