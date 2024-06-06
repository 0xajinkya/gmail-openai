import { LoginLayout } from "@/components";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <LoginLayout>{children}</LoginLayout>
    </Box>
  );
};

export default Layout;
