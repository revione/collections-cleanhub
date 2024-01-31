import { getCollections } from "./api/hubs";

import Collections from "./components/Collections";
import ErrorView from "./components/ErrorView";

export default async function Home() {
  try {
    const collections = await getCollections();
    return <Collections collections={collections} />;
  } catch (error) {
    console.error("Error fetching collections:", error);
    if (error instanceof Error) return <ErrorView>{error.message}</ErrorView>;
    return <ErrorView>Error fetching collections.</ErrorView>;
  }
}
