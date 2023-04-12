import React, { useState } from "react";
import useField from "../hooks";

import diaryService from "../services/diaries";
import { NewDiaryProps, ValidationError, Visibility, Weather } from "../types";
import axios from "axios";

const NewDiary = (props: NewDiaryProps) => {
  const date = useField("date");
  const comment = useField("text");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date.input.value,
      weather: weather,
      visibility: visibility,
      comment: comment.input.value,
    };

    try {
      diaryService.createDiary(diaryToAdd).then((data) => {
        props.setDiaries(props.diaries.concat(data));
      });
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        props.setError(error.message);
      } else {
        console.error(error);
      }
    }

    date.reset();
    comment.reset();
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date: <input {...date.input} />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input type="radio" onChange={() => setVisibility(Visibility.Good)} />
          ok
          <input type="radio" onChange={() => setVisibility(Visibility.Ok)} />
          poor
          <input type="radio" onChange={() => setVisibility(Visibility.Poor)} />
        </div>
        <div>
          weather: sunny
          <input type="radio" onChange={() => setWeather(Weather.Sunny)} />
          rainy
          <input type="radio" onChange={() => setWeather(Weather.Rainy)} />
          cloudy
          <input type="radio" onChange={() => setWeather(Weather.Cloudy)} />
          stormy
          <input type="radio" onChange={() => setWeather(Weather.Stormy)} />
          windy
          <input type="radio" onChange={() => setWeather(Weather.Windy)} />
        </div>
        <div>
          comment: <input {...comment.input} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiary;
