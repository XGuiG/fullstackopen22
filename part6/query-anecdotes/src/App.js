import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";
import AnecdoteList from "./components/AnecdoteList";
import { useReducer } from "react";
import { NotificationReducer } from "./components/Notification";
import NotificationContext from "./Context";

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    NotificationReducer,
    null
  );

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
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdotes={anecdotes} />
      </NotificationContext.Provider>
    </div>
  );
};

export default App;
