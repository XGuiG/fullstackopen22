import React, { useState } from "react";
import { useField } from "../../../hooks";
import {
  Diagnosis,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
} from "../../../types";
import {
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Grid,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type usefield = {
  input: {
    type: string;
    value: string;
    onChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
  };
  reset: () => void;
};

interface optionProps {
  type: EntryType;
  rating: HealthCheckRating;
  setRating: React.Dispatch<
    React.SetStateAction<HealthCheckRating>
  >;
  dischargeDate: usefield;
  dischargeCriteria: usefield;
  employName: usefield;
  startDate: usefield;
  endDate: usefield;
}

const EntryOptionForm = ({
  type,
  rating,
  setRating,
  dischargeDate,
  dischargeCriteria,
  employName,
  startDate,
  endDate,
}: optionProps) => {
  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const rating = Number(
        Object.values(HealthCheckRating).find((r) => r === value)
      );
      if (rating || rating === 0) {
        setRating(rating);
      }
    }
  };

  switch (type) {
    case "HealthCheck":
      return (
        <div>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="rating">HealthCheckRating</InputLabel>
            <Select
              labelId="rating"
              fullWidth
              value={rating}
              onChange={onRatingChange}
              label="HealthCheckRating"
            >
              <MenuItem value={0}>
                0<em>Healthy</em>
              </MenuItem>
              <MenuItem value={1}>
                1<em>LowRisk</em>
              </MenuItem>
              <MenuItem value={2}>
                2<em>HighRisk</em>
              </MenuItem>
              <MenuItem value={3}>
                3<em>CriticalRisk</em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      );
    case "Hospital":
      return (
        <div>
          <h3>discharge</h3>
          <strong>date: </strong>
          <Input {...dischargeDate.input} fullWidth />
          <strong>criteria: </strong>
          <Input
            placeholder="criteria of discharge"
            {...dischargeCriteria.input}
            fullWidth
          />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <strong>employerName: </strong>
          <Input placeholder="employerName" {...employName.input} fullWidth />
          <h3>sickLeave</h3>
          <strong>startDate: </strong>
          <Input {...startDate.input} fullWidth />
          <strong>endDate: </strong>
          <Input {...endDate.input} fullWidth />
        </div>
      );
  }
};

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[] | undefined;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const description = useField("text");
  const date = useField("date");
  const specialist = useField("text");
  const [codes, setCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating['Healthy']);
  const dischargeDate = useField("date");
  const dischargeCriteria = useField("text");
  const employName = useField("text");
  const startDate = useField("date");
  const endDate = useField("date");

  const onTypeChange = (event: SelectChangeEvent) => {
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      if (
        value === "HealthCheck" ||
        value === "Hospital" ||
        value === "OccupationalHealthcare"
      ) {
        setType(value);
      }
    }
  };

  const diagnoseCodes = diagnoses?.map((d) => d.code);

  const findByCode = (code: string) => {
    const diagnose = diagnoses?.find((d) => d.code === code);
    if (diagnose) {
      if (diagnose.name.length > 50) {
        return diagnose.name.substring(0, 50);
      }
      return diagnose.name;
    }
  };

  const onCodeChange = (event: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = event;
    setCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (type === "HealthCheck" && (rating || rating === 0)) {
      onSubmit({
        description: description.input.value,
        date: date.input.value,
        specialist: specialist.input.value,
        diagnosisCodes: codes,
        type: type,
        healthCheckRating: rating,
      });
    } else if (type === "Hospital") {
      onSubmit({
        description: description.input.value,
        date: date.input.value,
        specialist: specialist.input.value,
        diagnosisCodes: codes,
        type: type,
        discharge: {
          date: dischargeDate.input.value,
          criteria: dischargeCriteria.input.value,
        },
      });
    } else if (type === "OccupationalHealthcare") {
      onSubmit({
        description: description.input.value,
        date: date.input.value,
        specialist: specialist.input.value,
        diagnosisCodes: codes,
        type: type,
        employerName: employName.input.value,
        sickLeave: {
          startDate: startDate.input.value,
          endDate: endDate.input.value,
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <strong>description: </strong>
        <Input
          {...description.input}
          placeholder="description"
          fullWidth
          required
        />
        <strong>date: </strong>
        <Input {...date.input} fullWidth required />
        <strong>specialist: </strong>
        <Input
          {...specialist.input}
          placeholder="specialist"
          fullWidth
          required
        />
        <FormControl sx={{ m: 1, width: 550 }}>
          <InputLabel id="codes">DiagnosisCodes</InputLabel>
          <Select
            labelId="codes"
            multiple
            value={codes}
            onChange={onCodeChange}
            renderValue={(selected) => selected.join(",")}
            input={<OutlinedInput label="DiagnosisCodes" />}
            MenuProps={MenuProps}
          >
            {diagnoseCodes?.map((code) => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={codes.indexOf(code) > -1} />
                <ListItemText primary={code} />
                <div>{findByCode(code)}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="type">type</InputLabel>
          <Select
            labelId="type"
            value={type}
            onChange={onTypeChange}
            autoWidth
            label="type"
          >
            <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>

        <EntryOptionForm
          type={type}
          rating={rating}
          setRating={setRating}
          dischargeDate={dischargeDate}
          dischargeCriteria={dischargeCriteria}
          employName={employName}
          startDate={startDate}
          endDate={endDate}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
