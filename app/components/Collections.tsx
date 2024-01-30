"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

import { CollectionData, GroupBySelect, Stage, State } from "@/app/types";

import Collection from "./Collection";
import SelectsFilter from "./filters/SelectsFilter";
import BooleanFilter from "./filters/BooleanFilter";
import SearchFilters from "./filters/SerchFilter";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function Collections({
  collections,
}: {
  collections: CollectionData[];
}) {
  const defaultSelects = {
    state: "all" as State | "all",
    stage: "all" as Stage | "all",
    groupBy: "none" as GroupBySelect,
  };

  const [selects, setSelects] = useState(defaultSelects);

  const [parentHubNamePortfolio, setParentHubNamePortfolio] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchTextDebounced, setSearchTextDebounced] = useState("");
  const [groupsCollections, setGroups] = useState<
    Record<string, CollectionData[]>
  >({});

  const resetFilters = () => {
    setSelects(defaultSelects);
    setParentHubNamePortfolio(true);
    setSearchText("");
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchTextDebounced(value);
  }, 500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
  };

  const filteredCollections = useMemo(() => {
    const lowerSearchText = searchTextDebounced.toLowerCase();

    return collections.filter((collection) => {
      const stateMatches =
        selects.state === "all" || collection.state === selects.state;
      const stageMatches =
        selects.stage === "all" || collection.stage === selects.stage;
      const portfolioMatches = parentHubNamePortfolio
        ? collection.parentHubName === "Portfolio"
        : collection.parentHubName !== "Portfolio";
      const stringMatches =
        (searchTextDebounced.length > 0 &&
          collection.name.toLowerCase().includes(lowerSearchText)) ||
        collection.collectionAndSortingParagraph
          ?.toLowerCase()
          .includes(lowerSearchText) ||
        collection.cardDescription?.toLowerCase().includes(lowerSearchText);

      return stateMatches && stageMatches && portfolioMatches && stringMatches;
    });
  }, [collections, parentHubNamePortfolio, selects, searchTextDebounced]);

  useEffect(() => {
    const groupBy = selects.groupBy;

    if (groupBy !== "none") {
      const collectionGroups = filteredCollections.reduce(
        (acc, collection) => {
          const key =
            groupBy === GroupBySelect.state
              ? collection.state
              : collection.stage;
          if (!acc[key]) acc[key] = [];
          acc[key].push(collection);
          return acc;
        },
        {} as Record<string, CollectionData[]>
      );

      setGroups(collectionGroups);
    }
  }, [filteredCollections, selects.groupBy]);

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
        <Button onClick={resetFilters}>Reset Filters</Button>
      </Box>

      {selects.groupBy !== "none" ? (
        <Box>
          {Object.keys(groupsCollections).map((key) => (
            <Box key={key}>
              <Typography variant="h3">{key}</Typography>
              <CollectionsGrid collections={groupsCollections[key]} />
            </Box>
          ))}
        </Box>
      ) : (
        <CollectionsGrid collections={filteredCollections} />
      )}
    </Container>
  );
}

const CollectionsGrid = ({
  collections,
}: {
  collections: CollectionData[];
}) => (
  <Box>
    <Grid container spacing={2}>
      {collections.map((collection) => (
        <Grid item key={collection.uuid} xs={12} sm={6} md={6} lg={4}>
          <Collection collectionData={collection} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
