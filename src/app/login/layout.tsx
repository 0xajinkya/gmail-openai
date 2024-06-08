import { LoginLayout } from "@/components";
import { Box, Typography } from "@mui/material";
import { ReactNode, Suspense } from "react";

/**
 * Layout component for the application.
 * This component wraps the main content with a login layout,
 * providing a consistent structure and styling across pages.
 * @param children The child components to be rendered within the layout.
 * @returns JSX.Element
 */
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
      {/* Add a suspense fallback for error handling */}
      <Suspense
        fallback={
          <Box>
            <Typography>Some error occurred!</Typography>
          </Box>
        }
      >
        {/* Wrap the child components with LoginLayout for login-related styling */}
        <LoginLayout>{children}</LoginLayout>
      </Suspense>
    </Box>
  );
};

export default Layout;
