"use client";

import { theme } from "@/utils";
import { Box, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <ThemeProvider
        theme={theme}
      >
      <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </Box>
  );
};
