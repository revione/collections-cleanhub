import { Box } from "@mui/material";

import Collections from "./components/Collections";

import { CollectionData } from "./types";

const getCollections = async (): Promise<CollectionData[]> => {
  if (process.env.URL_COLLECTIONS) {
    const res = await fetch(process.env.URL_COLLECTIONS);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } else {
    console.error("Error URL_COLLECTIONS no defined:");
    return [];
  }
};

export default async function Home() {
  const collectionsPromise = getCollections();

  try {
    const collections = await collectionsPromise;
    return (
      <Box>
        <Collections collections={collections} />
      </Box>
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
    return <Box>Error fetching collections</Box>;
  }
}
