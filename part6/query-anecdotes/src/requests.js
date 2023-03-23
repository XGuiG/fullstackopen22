import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newObject) =>
  axios.post(baseUrl, newObject).then((res) => res.data);

export const updateVotes = (newObject) =>
  axios.put(`${baseUrl}/${newObject.id}`, newObject).then((res) => res.data);
