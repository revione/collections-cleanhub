import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { State, Stage, GroupBySelect } from "@/app/types";

const SelectsFilter = ({
  selects,
  setSelects,
}: {
  selects: {
    state: "all" | State;
    stage: "all" | Stage;
    groupBy: GroupBySelect;
  };
  setSelects: Dispatch<
    SetStateAction<{
      state: "all" | State;
      stage: "all" | Stage;
      groupBy: GroupBySelect;
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
    setSelects((lastState) => ({
      ...lastState,
      [event.target.name]: event.target.value as Stage,
    }));
  };

  const handleGroupByChange = (event: SelectChangeEvent<GroupBySelect>) => {
    setSelects((lastState) => ({
      ...lastState,
      [event.target.name]: event.target.value as GroupBySelect,
    }));
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
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

      <FormControl>
        <InputLabel htmlFor="group-by-select">Group by</InputLabel>
        <Select
          value={selects.groupBy}
          onChange={handleGroupByChange}
          label="Group by"
          name="groupBy"
          inputProps={{
            id: "group-by-select",
          }}
        >
          {Object.values(GroupBySelect).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectsFilter;
