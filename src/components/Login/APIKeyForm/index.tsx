"use client";

import { LoginContext } from "@/context";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { useContext, useState } from "react";

/**
 * Component for rendering a form to input and save OpenAI API key.
 * It allows users to input their API key and save it using the provided context.
 */
export const APIKeyForm = () => {
  const { saveOpenAPIKey } = useContext(LoginContext);
  const [key, setKey] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: ["250px"],
      }}
    >
      {/* Input field for entering the OpenAI API key */}
      <InputBase
        sx={{
          border: "2px solid white",
          color: "white",
          borderRadius: "12px",
          px: "16px",
          py: "8px",
          fontFamily: "Ubuntu",
        }}
        onChange={(e) => setKey(e.target.value)}
      />
      {/* Note for the user about the API key format */}
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 600,
        }}
      >
        Note: Put in your OpenAI API key, minimum 45 characters starting with &apos;sk-&apos;
      </Typography>
      {/* Button to save the API key */}
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
        // Disable the button if the key length is less than 45 characters or doesn't start with 'sk-'
        disabled={
          key.length >= 45 ? (key.slice(0, 3) === "sk-" ? false : true) : true
        }
      >
        Add Your OpenAI API Key
      </Button>
    </Box>
  );
};
