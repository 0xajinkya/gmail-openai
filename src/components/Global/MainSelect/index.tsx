"use client";

import {
  Box,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

/**
* MainSelect component for selecting options from a dropdown menu.
* @param name - The name of the select field.
* @param fieldName - The name of the field in the form.
* @param placeholder - The placeholder text for the select field.
* @param onChange - Function to handle changes in the select value.
* @param required - Whether the select field is required.
* @param value - The current value of the select field.
* @param values - The list of values for the select field.
* @param onClick - Function to handle click events on the select field.
*/
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
  values: (string | number)[];
  onClick?: () => void;
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
              onClick={onClick}
          >
              <MenuItem disabled value="">
                  <em>Choose {name}</em>
              </MenuItem>
              {values.map((val, idx) => (
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
