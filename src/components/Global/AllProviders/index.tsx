"use client";

import { GlobalProvider } from "@/context";
import { theme } from "@/utils";
import { Box, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

/**
 * Provides global context, theme, and snackbar functionality to the entire application.
 * This component wraps the child components with ThemeProvider for theming, SnackbarProvider for displaying snackbars,
 * and GlobalProvider for managing global state.
 * @param children The child components to be wrapped by the providers.
 * @returns JSX.Element
 */
export const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          color: "white",
          fontFamily: "Ubuntu",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SnackbarProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
};
