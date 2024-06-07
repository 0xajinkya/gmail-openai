"use client";

import {
  Box,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent, ReactElement, ReactNode, useState } from "react";

export const MainSelect = ({
  name,
  fieldName,
  placeholder,
  onChange,
  required,
  value,
  values,
  onClick,
}: {
  name: string;
  fieldName: string;
  placeholder: string;
  onChange?: (event: SelectChangeEvent) => void;
  required?: boolean;
  value?: string | number;
  values: string[] | number[];
  onClick?: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      sx={{
        borderWidth: "1.6px",
        borderStyle: "solid",
        borderColor: isFocused ? "#white" : "#DDD",
        borderRadius: "16px",
        position: "relative",
      }}
    >
      <Select
        input={<InputBase placeholder={placeholder} />}
        sx={{
          px: "24px",
          py: "16px",
          width: "100%",
          cursor: "pointer",
          color: "white",
        }}
        displayEmpty
        value={`${value}` ?? ""}
        name={fieldName}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        notched
        onClick={onClick ?? ""}
      >
        <MenuItem disabled value="">
          <em>Choose {name}</em>
        </MenuItem>
        {values?.map((val, idx) => (
          <MenuItem key={idx} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
      <Typography
        sx={{
          fontSize: "11px",
          color: isFocused ? "#white" : "#DDD",
          position: "absolute",
          top: "-9px",
          left: "20px",
          px: "6px",
          bgcolor: "#010120",
          fontWeight: 600,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};
