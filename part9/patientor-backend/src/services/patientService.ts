import patientData from "../../data/patient";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientEntry,
  patientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: patientEntry[] = patientData;

const getEntries = (): patientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): patientEntry => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): patientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === id);
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
