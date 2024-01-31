import { Box } from "@mui/material";

const ErrorView = ({ children }: { children: string }) => (
  <Box
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </Box>
);

export default ErrorView;
