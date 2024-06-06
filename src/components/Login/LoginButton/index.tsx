"use client";

import { ImgIcon } from "@/components/Global/ImgIcon";
import { LoginContext } from "@/context";
import { Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material";
import { useContext } from "react";

export const LoginButton = () => {
  const { handleLogin, loading } = useContext(LoginContext);

  return (
    <>
      {loading ? (
        <CircularProgress
          sx={{
            color: "white",
          }}
        />
      ) : (
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
