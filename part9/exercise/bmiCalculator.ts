// interface CalculateValues {
//   height: number;
//   weight: number;
// }

// const parseArguments = (args: string[]): CalculateValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateBmi = (height: number, weight: number): string | undefined => {
  const result = Number((weight / ((height * height) / 10000)).toFixed(1));

  switch (true) {
    case result < 16.0:
      return "Underweight (Severe thinness)";
    case result >= 16.0 && result <= 16.9:
      return "Underweight (Moderate thinness)";
    case result >= 17.0 && result <= 18.4:
      return "Underweight (Mild thinness)";
    case result >= 18.5 && result <= 24.9:
      return "Normal (healthy weight)";
    case result >= 25.0 && result <= 29.9:
      return "Overweight (Pre-obese)";
    case result >= 30.0 && result <= 34.9:
      return "Obese (Class I)";
    case result >= 35.0 && result <= 39.9:
      return "Obese (Class II)";
    case result >= 40.0:
      return "Obese (Class III)";
    default:
      return undefined;
  }
};

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += "Error:" + error.message;
//   }
//   console.log(errorMessage);
// }
