import { useSelector, useDispatch } from "react-redux";
import { voteOf } from "../reducers/anecdoteReducer";
import { notificationToShow } from "./Notification";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter
      ? anecdotes.filter(
          (a) => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        )
      : anecdotes;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(voteOf(anecdote, anecdotes));
    dispatch(
      notificationToShow(
        `you voted '${anecdote.content}'`, 10
      )
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes {""}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
