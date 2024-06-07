import { Button } from "@mui/material";
import React from "react";

export const OutlinedButton = ({
  title,
  styles,
  onClick,
}: {
  title: string;
  styles?: object;
  onClick?: any;
}) => {
  return (
    <Button
      sx={{
        borderRadius: "15px",
        border: "1px solid white",
        color: "white",
        // width: "100%",
        whiteSpace: "nowrap",
        fontSize: ["12px", "auto"],
        textTransform: "capitalize",
        ":hover": {
          border: "1px solid white",
        },
        ...styles,
      }}
      onClick={onClick}
      variant="outlined"
    >
      {title}
    </Button>
  );
};
