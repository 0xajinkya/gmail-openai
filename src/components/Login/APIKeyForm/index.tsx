"use client";

import { LoginContext } from "@/context";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { useContext, useState } from "react";

export const APIKeyForm = () => {

  const { saveOpenAPIKey } = useContext(LoginContext);

  const [key, setKey] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <InputBase
        sx={{
          border: "2px solid white",
          color: "white",
          borderRadius: "12px",
          px: "16px",
          py: "8px",
          fontFamily: "Ubuntu"
        }}
        onChange={(e) => setKey(e.target.value)}
      />
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 600
        }}
      >
        Note: Put in your OpenAI API key, minimum 45 characters starting with &apos;sk-&apos;
      </Typography>
      <Button
        sx={{
          backgroundColor: "white",
          textTransform: "capitalize",
          fontFamily: "Ubuntu",
          border: "2px solid white",
          borderRadius: "12px",
          px: "16px",
          py: "8px",
          ":hover": {
            backgroundColor: "white",
          },
        }}
        onClick={() => saveOpenAPIKey(key)}
        disabled={key.length < 45}
      >
        Add Your OpenAI API Key
      </Button>
    </Box>
  );
};
