import { IUser } from "@/utils";
import { Avatar, Box, Button, Typography } from "@mui/material";

/**
 * Header component for displaying user information and logout button.
 * @param user - The user object containing user information.
 * @param logOut - The function to handle user logout.
 */
export const Header = ({ user, logOut }: { user: IUser; logOut: () => void }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}
            >
                <Avatar
                    src={user.picture}
                    sx={{
                        width: "70px",
                        height: "70px",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                >
                    <Typography>{user.name}</Typography>
                    <Typography
                        sx={{
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: "12px",
                        }}
                    >
                        {user.email}
                    </Typography>
                </Box>
            </Box>
            <Button
                sx={{
                    backgroundColor: "darkred",
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: "13px",
                    borderRadius: "12px",
                    px: "12px",
                    ":hover": {
                        backgroundColor: "darkred",
                    },
                }}
                onClick={() => logOut()}
            >
                Log out
            </Button>
        </Box>
    );
};
