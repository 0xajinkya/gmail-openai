import { APIKeyForm } from "@/components";
import { Box } from "@mui/material";

/**
 * Page component representing the page for adding an OpenAI API key.
 * This component renders an APIKeyForm component wrapped in a Box container.
 * @returns JSX.Element
 */
const Page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Render the APIKeyForm component */}
      <APIKeyForm />
    </Box>
  );
};

export default Page;
