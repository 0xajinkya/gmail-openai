import { HomeLayout } from "@/components";
import { Box } from "@mui/material";
import { ReactNode } from "react";

/**
 * Layout component for the home page.
 * @param children - The children components to be rendered within the layout.
 * @returns The layout component with the home layout applied.
 */
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <HomeLayout>{children}</HomeLayout>
    </Box>
  );
};

export default Layout;
