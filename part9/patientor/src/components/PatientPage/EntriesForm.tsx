import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from "../../types";
import diagnoseService from "../../services/diagnoses";
import { useState, useEffect } from "react";
import axios from "axios";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

import patientService from "../../services/patients";
import AddEntryModal from "./AddEntryModel";

interface Props {
  patient: Patient;
}

const HealthRatingIcon = ({
  healthCheckRating,
}: {
  healthCheckRating: HealthCheckRating;
}) => {
  switch (healthCheckRating) {
    case 0:
      return (
        <div className="healthy">
          <FavoriteIcon color="success"></FavoriteIcon>
          <em>
            <strong>healthy</strong>
          </em>
        </div>
      );
    case 1:
      return (
        <div className="LowRisk">
          <FavoriteIcon color="primary"></FavoriteIcon>
          <em>
            <strong>LowRisk</strong>
          </em>
        </div>
      );
    case 2:
      return (
        <div className="HighRisk" color="green">
          <FavoriteIcon color="warning"></FavoriteIcon>
          <em>
            <strong>HighRisk</strong>
          </em>
        </div>
      );
    case 3:
      return (
        <div className="CriticalRisk" color="green">
          <FavoriteIcon color="error"></FavoriteIcon>
          <em>
            <strong>CriticalRisk</strong>
          </em>
        </div>
      );
    default:
      return null;
  }
};

const EntryForm = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <div>
            {entry.date} <MonitorHeartIcon></MonitorHeartIcon>{" "}
          </div>
          <div>
            <em>{entry.description}</em>
          </div>
          <HealthRatingIcon healthCheckRating={entry.healthCheckRating} />
        </div>
      );
    case "Hospital":
      return (
        <div>
          <div>
            {entry.date} <LocalHospitalIcon></LocalHospitalIcon>{" "}
          </div>
          <div>
            <em>{entry.description}</em>
          </div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <div>
            {entry.date} <HealthAndSafetyIcon></HealthAndSafetyIcon>{" "}
            <em>{entry.employerName}</em>
            <div>
              <em>{entry.description}</em>
            </div>
          </div>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const Entries = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [entries, setEntries] = useState<Entry[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setEntries(patient.entries.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    setEntries(patient.entries);
  }, []);

  if (!patient.entries) {
    return null;
  }

  diagnoseService.getAll().then((data) => setDiagnoses(data));

  const findByCode = (code: string) => {
    const diagnose = diagnoses?.find((d) => d.code === code);
    if (diagnose) {
      return diagnose.name;
    }
  };

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 10,
  };

  return (
    <div>
      {entries?.map((entry) => (
        <div key={entry.id} style={style}>
          <EntryForm entry={entry} />
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                <strong>{code}</strong> {findByCode(code)}
              </li>
            ))}
          </ul>
          diagnose by {entry.specialist}
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default Entries;
