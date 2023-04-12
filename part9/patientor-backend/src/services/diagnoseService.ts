import diagnoseData from "../../data/diagnoses";
import { diagnoseEntry } from "../types";

const diagnoses: diagnoseEntry[] = diagnoseData;

const getEntries = () => {
  return diagnoses;
};

export default { getEntries };
