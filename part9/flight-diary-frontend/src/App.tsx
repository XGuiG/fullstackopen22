import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

import diaryService from "./services/diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  const [error, setError] = useState(``);
  const notify = () => {
    return <div>{error === "" ? null : <div>{error}</div>}</div>;
  };

  return (
    <div>
      {notify()}
      <NewDiary diaries={diaries} setDiaries={setDiaries} setError={setError} />
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.date}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility}
          <br></br>
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};

export default App;
