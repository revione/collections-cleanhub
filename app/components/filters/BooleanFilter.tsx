import React, { Dispatch, SetStateAction, useState } from "react";
import { Switch, FormControlLabel, Box } from "@mui/material";

export default function BooleanFilter({
  parentHubNamePortfolio,
  setParentHubNamePortfolio,
}: {
  parentHubNamePortfolio: boolean;
  setParentHubNamePortfolio: Dispatch<SetStateAction<boolean>>;
}) {
  const handleToggleChange = () => {
    setParentHubNamePortfolio((prevValue) => !prevValue);
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={parentHubNamePortfolio}
            onChange={handleToggleChange}
            color="primary"
          />
        }
        label="Parent Hub Name Portfolio"
      />
    </Box>
  );
}
