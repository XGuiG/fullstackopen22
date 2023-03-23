import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // voteOf(state, action) {
    //   const id = action.payload;
    //   const anecdoteToChange = state.find((a) => a.id === id);
    //   const ChangedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   };
    //   return state
    //     .map((a) => (a.id !== id ? a : ChangedAnecdote))
    //     .sort((a, b) => b.votes - a.votes);
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteOf = (anecdote, anecdotes) => {
  const anecdoteToChange = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    const ChangedAnecdote = await anecdoteService.updateVote(anecdoteToChange);
    // const anecdotes = await anecdoteService.getAll();
    dispatch(
      setAnecdotes(
        anecdotes
          .map((a) => (a !== anecdote ? a : ChangedAnecdote))
          .sort((a, b) => b.votes - a.votes)
      )
    );
  };
};

export default anecdoteSlice.reducer;
