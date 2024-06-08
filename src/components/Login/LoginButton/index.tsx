"use client";

import { ImgIcon } from "@/components/Global/ImgIcon";
import { LoginContext } from "@/context";
import { Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material";
import { useContext } from "react";

/**
 * Component for rendering a login button.
 * It displays a loading spinner when loading, and a button with Google icon when not loading.
 */
export const LoginButton = () => {
  const { handleLogin, loading } = useContext(LoginContext);

  return (
    <>
      {loading ? (
        // Display a circular progress indicator when loading
        <CircularProgress
          sx={{
            color: "white",
          }}
        />
      ) : (
        // Display a loading button with Google icon when not loading
        <LoadingButton
          onClick={handleLogin}
          sx={{
            backgroundColor: "white",
            fontFamily: "Ubuntu",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            px: "24px",
            py: "8px",
            borderRadius: "25px",
            ":hover": {
              backgroundColor: "white",
            },
          }}
          loading={loading}
        >
          Login With
          {/* Render Google icon */}
          <ImgIcon
            path="/icons/google.svg"
            width={30}
            height={30}
            name="Google"
          />
        </LoadingButton>
      )}
    </>
  );
};
