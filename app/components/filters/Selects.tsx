import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { State, Stage } from "@/app/types";

const Selects = ({
  selects,
  setSelects,
}: {
  selects: {
    state: "all" | State;
    stage: "all" | Stage;
  };
  setSelects: Dispatch<
    SetStateAction<{
      state: "all" | State;
      stage: "all" | Stage;
    }>
  >;
}) => {
  const handleStateChange = (event: SelectChangeEvent<State | "all">) => {
    setSelects((lastState) => ({
      ...lastState,
      [event.target.name]: event.target.value as State,
    }));
  };

  const handleStageChange = (event: SelectChangeEvent<Stage | "all">) => {
    console.log({ event });
    setSelects((lastState) => ({
      ...lastState,
      [event.target.name]: event.target.value as Stage,
    }));
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Box>
        <FormControl>
          <InputLabel htmlFor="state-select">State</InputLabel>
          <Select
            value={selects.state}
            onChange={handleStateChange}
            name="state"
            label="State"
            inputProps={{
              id: "state-select",
            }}
          >
            <MenuItem value="all">All</MenuItem>

            {Object.values(State).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <InputLabel htmlFor="stage-select">Stage</InputLabel>
          <Select
            value={selects.stage}
            onChange={handleStageChange}
            label="Stage"
            name="stage"
            inputProps={{
              id: "stage-select",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {Object.values(Stage).map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Selects;
