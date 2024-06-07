import { IEmail } from "@/context";
import { parseEmail } from "@/lib";
import { PasswordRounded } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";

export const EmailCard = ({ email }: { email: IEmail }) => {
  const parsedFrom = parseEmail(
    email.payload.headers.filter((vl) => vl.name === "From")[0].value
  );

  return (
    <Box
      sx={{
        border: "2px solid grey",
        borderRadius: "12px",
        px: "20px",
        py: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {typeof parsedFrom === "string" ? (
        <Typography>{parsedFrom}</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: ["flex-start", "center"],
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: ["4px", "16px"],
              flexDirection: ["column", "row"],
              // justifyContent: "space-between",
              alignItems: ["flex-start", "center"],
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
              }}
            >
              {parsedFrom.name.replace(/['"]/g, "")}
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                color: "grey",
              }}
            >
              {parsedFrom.email}
            </Typography>
          </Box>
          {email.classification && (
            // <Chip
            //   label={email.classification}
            //   sx={{
            //     color: "white",
            //     textTransform: "capitalize",
            //     fontSize: "11px",
            //     fontWeight: 700,
            //     backgroundColor:
            //       email.classification === "important"
            //         ? "red"
            //         : email.classification === "social"
            //         ? "black"
            //         : email.classification === "general"
            //         ? "green"
            //         : "grey",
            //   }}
            // />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "11px",
                color: email.classification === "important" ? "green" : email.classification === "marketing" ? "yellow" : email.classification === "spam" ? "red" : "grey"
              }}
            >
              {email.classification}
            </Typography>
          )}
        </Box>
      )}
      <Typography>
        {email.payload.headers.filter((vl) => vl.name === "Subject")[0].value}
      </Typography>
      <Typography
        sx={{
          fontSize: "13px",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {email.snippet}
      </Typography>
    </Box>
  );
};
