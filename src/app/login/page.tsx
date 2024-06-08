import { LoginButton } from "@/components";
import { Box } from "@mui/material";

/**
 * Page component representing the login page.
 * This component renders a login button wrapped in a Box container.
 * @returns JSX.Element
 */
const Page = async () => {
    return (
        <Box>
            {/* Render the LoginButton component */}
            <LoginButton />
        </Box>
    );
}

export default Page;
