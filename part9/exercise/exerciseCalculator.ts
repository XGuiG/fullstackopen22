interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface ExerciseValues {
//   target: number;
//   times: number[];
// }

// const argsArguments = (args: string[]): ExerciseValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   let times = [];
//   if (!isNaN(Number(args[2]))) {
//     for (let i = 3; i < args.length; i++) {
//       if (!isNaN(Number(args[i]))) {
//         // times.concat(Number(args[i]))
//         times[i - 3] = Number(args[i]);
//       } else {
//         throw new Error("Provided values were not numbers!");
//       }
//     }

//     return {
//       target: Number(args[2]),
//       times: times,
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateExercises = (times: number[], target: number): Result => {
  const periodLength = times.length;
  let trainingDays = 0;
  for (let i = 0; i < periodLength; i++) {
    if (times[i] !== 0) {
      trainingDays++;
    }
  }
  const average = times.reduce((sum, time) => time + sum, 0) / periodLength;
  let success = true;
  if (average < target) {
    success = false;
  }
  let rating = 1;
  let ratingDescription = "";
  switch (true) {
    case average / target < 0.8:
      rating = 1;
      ratingDescription = "come on and catch the target";
      break;
    case average / target >= 0.8 && average / target < 1:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    case average / target >= 1:
      rating = 3;
      ratingDescription = "wonderful!";
      break;
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

// try {
//   const { target, times } = argsArguments(process.argv);
//   console.log(calculateExercises(times, target));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += "Error:" + error.message;
//   }
//   console.log(errorMessage);
// }
