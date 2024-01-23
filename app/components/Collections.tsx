"use client";
import { useMemo, useState } from "react";
import { CollectionData, Stage, State } from "@/app/types";

import Collection from "./Collection";
import Selects from "./filters/Selects";

import { Box, Container, Grid } from "@mui/material";

export default function Collections({
  collections,
}: {
  collections: CollectionData[];
}) {
  const [selects, setSelects] = useState({
    state: "all" as State | "all",
    stage: "all" as Stage | "all",
  });

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) => {
      const stateMatches =
        selects.state === "all" || collection.state === selects.state;
      const stageMatches =
        selects.stage === "all" || collection.stage === selects.stage;

      return stateMatches && stageMatches;
    });
  }, [collections, selects]);

  return (
    <Container sx={{ marginY: "1rem" }}>
      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Selects {...{ selects, setSelects }} />
      </Box>
      <Box>
        <Grid container spacing={2}>
          {filteredCollections.map((collection) => (
            <Grid item key={collection.uuid} xs={12} sm={6} md={6} lg={4}>
              <Collection CollectionData={collection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
