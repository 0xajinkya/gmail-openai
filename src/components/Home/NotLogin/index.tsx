import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * Component for rendering a message indicating that the user is not logged in.
 * It provides a link for the user to navigate to the login page.
 */
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
      {/* Error icon */}
      <ErrorIcon
        sx={{
          width: "80px",
          height: "80px",
          color: "red",
        }}
      />
      {/* Message indicating not logged in and link to login page */}
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
