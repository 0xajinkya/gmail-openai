import { LoginLayout } from "@/components";
import { Box, Typography } from "@mui/material";
import { ReactNode, Suspense } from "react";

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
      <Suspense
        fallback={
          <Box>
            <Typography>Some error occurred!</Typography>
          </Box>
        }
      >
        <LoginLayout>{children}</LoginLayout>
      </Suspense>
    </Box>
  );
};

export default Layout;
