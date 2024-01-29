"use client";
import { ChangeEvent, useMemo, useState } from "react";
import { CollectionData, Stage, State } from "@/app/types";

import Collection from "./Collection";
import SelectsFilter from "./filters/SelectsFilter";
import BooleanFilter from "./filters/BooleanFilter";
import SearchFilters from "./filters/SerchFilter";

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

  const [parentHubNamePortfolio, setParentHubNamePortfolio] = useState(true);

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredCollections = useMemo(() => {
    const lowerSearchText = searchText.toLowerCase();

    return collections.filter((collection) => {
      const stateMatches =
        selects.state === "all" || collection.state === selects.state;
      const stageMatches =
        selects.stage === "all" || collection.stage === selects.stage;
      const portfolioMatches = parentHubNamePortfolio
        ? collection.parentHubName === "Portfolio"
        : collection.parentHubName !== "Portfolio";
      const stringMatches =
        (searchText.length > 0 &&
          collection.name.toLowerCase().includes(lowerSearchText)) ||
        collection.collectionAndSortingParagraph
          ?.toLowerCase()
          .includes(lowerSearchText) ||
        collection.cardDescription?.toLowerCase().includes(lowerSearchText);

      return stateMatches && stageMatches && portfolioMatches && stringMatches;
    });
  }, [collections, parentHubNamePortfolio, selects, searchText]);

  return (
    <Container sx={{ marginY: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <SelectsFilter selects={selects} setSelects={setSelects} />
        <BooleanFilter
          parentHubNamePortfolio={parentHubNamePortfolio}
          setParentHubNamePortfolio={setParentHubNamePortfolio}
        />
        <SearchFilters
          searchText={searchText}
          handleSearchChange={handleSearchChange}
        />
      </Box>
      <Box>
        <Grid container spacing={2}>
          {filteredCollections.map((collection) => (
            <Grid item key={collection.uuid} xs={12} sm={6} md={6} lg={4}>
              <Collection collectionData={collection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
