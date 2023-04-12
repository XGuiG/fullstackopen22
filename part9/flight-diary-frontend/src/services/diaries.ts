import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

export const baseUrl = "http://localhost:3001/api/diaries";

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

export default { getAll, createDiary };
