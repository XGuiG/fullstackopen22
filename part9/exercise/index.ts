import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.use(express.json());

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const response = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  };

  if (!isNaN(height) && !isNaN(weight)) {
    res.status(200).send(response);
  } else {
    res.status(404).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(404).send({ error: "parameters missing" });
  } else if (isNaN(Number(target))) {
    return res.status(404).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, Number(target));
    return res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
