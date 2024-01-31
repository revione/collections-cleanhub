import { CollectionData } from "../types";

export const getCollections = async (): Promise<CollectionData[]> => {
  if (process.env.URL_COLLECTIONS) {
    const res = await fetch(process.env.URL_COLLECTIONS);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } else {
    throw new Error("Error: URL_COLLECTIONS is not defined.");
  }
};
