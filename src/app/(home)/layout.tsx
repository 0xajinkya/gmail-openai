import { HomeLayout } from "@/components";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <HomeLayout>{children}</HomeLayout>
    </Box>
  );
};

export default Layout;
