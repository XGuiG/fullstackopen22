import {
  EntryType,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatientEntry,
  diagnoseEntry,
  dischargeFields,
  sickLeave,
} from "./types";

type patientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: patientFields): NewPatientEntry => {
  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name");
    }
    return name;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error("Incorrect or missing ssn");
    }
    return ssn;
  };

  const parseOccupation = (occupation: unknown) => {
    if (!occupation || !isString(occupation)) {
      throw new Error("Incorrect or missing occupation");
    }
    return occupation;
  };

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error("Incorrect or missing dateOfBirth: " + date);
    }
    return date;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
  };

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newEntry;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseType = (type: unknown): EntryType => {
  if (
    type === "HealthCheck" ||
    type === "Hospital" ||
    type === "OccupationalHealthcare"
  ) {
    return type;
  }
  throw new Error("Incorrect or missing type");
};

const parseDischarge = (discharge: unknown): dischargeFields => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  } else if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Missing date or criteria of discharge");
  } else if (!isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error("Incorrect date of discharge: " + discharge.date);
  } else if (!isString(discharge.criteria)) {
    throw new Error("Incorrect criteria of discharge");
  }

  return discharge as dischargeFields;
};

const parseSickLeave = (sickLeave: unknown): sickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sickLeave");
  } else if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Missing startDate or endDate of sickLeave");
  } else if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error("Incorrect startDate of sickLeave: " + sickLeave.startDate);
  } else if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error("Incorrect endDate of sickLeave: "+ sickLeave.endDate);
  }

  return sickLeave as sickLeave;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dateOfBirth: " + date);
  }
  return date;
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if ((!rating && rating !== 0) || !isRating(rating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + rating);
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<diagnoseEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<diagnoseEntry["code"]>;
  }

  return object.diagnosisCodes as Array<diagnoseEntry["code"]>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    object.type = parseType(object.type);
    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        healthCheckRating: parseRating(object.healthCheckRating),
      };
      return newEntry;
    } else if (
      object.type === "Hospital" &&
      "discharge" in object
    ) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };
      return newEntry;
    } else if (
      object.type === "OccupationalHealthcare" &&
      "employerName" in object &&
      "sickLeave" in object
    ) {
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: object.type,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      return newEntry;
    }
    throw new Error("Incorrect type or fields don't match type");
  }
  throw new Error("Incorrect data: a field missing");
};
