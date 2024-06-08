import { HomePage } from "@/components";
import { Box } from "@mui/material";

/**
 * Home page component.
 * @returns The home page component wrapped in a Box container.
 */
export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <HomePage />
    </Box>
  );
}
