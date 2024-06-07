import { HomePage, NotLogin } from "@/components";
import { Box } from "@mui/material";

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
