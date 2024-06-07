import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

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
      <IconButton onClick={() => prevPage()}>
        <ArrowBack
          sx={{
            color: "white",
          }}
        />
      </IconButton>
      <Typography>Page {page + 1}</Typography>
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
