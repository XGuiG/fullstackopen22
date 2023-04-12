import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useState } from "react";

import Entries from "./EntriesForm";

const GenderIcon = ({ patient }: { patient: Patient }) => {
  switch (patient.gender) {
    case "male":
      return <MaleIcon></MaleIcon>;
    case "female":
      return <FemaleIcon></FemaleIcon>;
    case "other":
      return <PersonIcon></PersonIcon>;
    default:
      return null;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  if (id) {
    patientService.findById(id).then((data) => setPatient(data));
  }

  return patient ? (
    <div>
      <h3>
        {patient.name} <GenderIcon patient={patient} />
      </h3>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h4>entries</h4>
      <Entries patient={patient}/>
    </div>
  ) : null;
};

export default PatientPage;
