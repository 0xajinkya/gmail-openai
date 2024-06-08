import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

/**
 * Component for rendering pagination controls.
 * It allows users to navigate between pages using arrow buttons.
 * @param {Object} props - The props for the Paging component.
 * @param {number} props.page - The current page number.
 * @param {Function} props.prevPage - Function to navigate to the previous page.
 * @param {Function} props.nextPage - Function to navigate to the next page.
 */
export const Paging = ({
  page,
  prevPage,
  nextPage,
}: {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Button to navigate to the previous page */}
      <IconButton onClick={() => prevPage()} disabled={page === 0}>
        <ArrowBack
          sx={{
            color: page === 0 ? "grey" : "white",
          }}
        />
      </IconButton>
      {/* Display current page number */}
      <Typography>Page {page + 1}</Typography>
      {/* Button to navigate to the next page */}
      <IconButton onClick={() => nextPage()}>
        <ArrowForward
          sx={{
            color: "white",
          }}
        />
      </IconButton>
    </Box>
  );
};
