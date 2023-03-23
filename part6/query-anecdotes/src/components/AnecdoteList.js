import { useContext } from "react";
import { useQueryClient, useMutation } from "react-query";
import NotificationContext from "../Context";
import { updateVotes } from "../requests";
import { NotificationReducer } from "./Notification";

const AnecdoteList = ({ anecdotes }) => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const updateVoteMutation = useMutation(updateVotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({type:"VOTE",anecdote:anecdote.content});
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
