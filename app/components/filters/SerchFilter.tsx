import { TextField } from "@mui/material";

export default function SearchFilters({
  searchText,
  handleSearchChange,
}: {
  searchText: string;
  handleSearchChange: (event: any) => void;
}) {
  return (
    <div>
      <TextField
        label="Search a collection"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  );
}
