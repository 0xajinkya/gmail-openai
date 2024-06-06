import { LoginProvider } from "@/context";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <LoginProvider>{children}</LoginProvider>
    </Box>
  );
};
