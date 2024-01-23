"use client";

import { CollectionData } from "@/app/types";

import { Box, Container, Grid } from "@mui/material";
import Collection from "./Collection";

export default function Collections({
  collections,
}: {
  collections: CollectionData[];
}) {
  return (
    <Container sx={{ marginY: "1rem" }}>
      <Box>
        <Grid container spacing={2}>
          {collections.map((collection) => (
            <Grid item key={collection.uuid} xs={12} sm={6} md={6} lg={4}>
              <Collection CollectionData={collection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
