import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

export const NotLogin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <ErrorIcon
        sx={{
          width: "80px",
          height: "80px",
          color: "red",
        }}
      />
      <Typography>
        OOPS...You are not logged in, please{" "}
        <Link
          className="link"
          href={"/login"}
          style={{ color: "white", textDecoration: "underline" }}
        >
          login here
        </Link>
      </Typography>
    </Box>
  );
};
