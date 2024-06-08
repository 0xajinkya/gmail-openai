import { Box, Typography } from "@mui/material";

export const EmailModalBody = ({
  subject,
  snippet,
}: {
  subject: string;
  snippet: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        {subject}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 500,
        }}
      >
        {snippet}
      </Typography>
    </Box>
  );
};
