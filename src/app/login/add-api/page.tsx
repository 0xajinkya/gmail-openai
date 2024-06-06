import { APIKeyForm } from "@/components";
import { Box, Button } from "@mui/material";

const Page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <APIKeyForm />
    </Box>
  );
};

export default Page;
