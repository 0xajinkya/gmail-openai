import { TEmailCat } from "@/utils";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

/**
 * Component for rendering the header of the email modal.
 * @param sentBy - The sender of the email.
 * @param classification - The classification of the email.
 * @param close - Function to close the email modal.
 */
export const EmailModalHeader = ({
    sentBy,
    classification,
    close,
}: {
    sentBy: string | { name: string; email: string };
    classification: TEmailCat | null;
    close: () => void;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {/* Render sender information */}
            {typeof sentBy === "string" ? (
                <Typography>{sentBy}</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography
                        sx={{
                            color: "black",
                        }}
                    >
                        {sentBy.name.replace(/['"]/g, "")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "11px",
                            color: "grey",
                        }}
                    >
                        {sentBy.email}
                    </Typography>
                </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                {/* Render email classification */}
                {classification && (
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "14px",
                            textTransform: "capitalize",
                            color:
                                classification === "important"
                                    ? "green"
                                    : classification === "marketing"
                                    ? "yellow"
                                    : classification === "spam"
                                    ? "red"
                                    : "grey",
                        }}
                    >
                        {classification}
                    </Typography>
                )}
                {/* Button to close the modal */}
                <IconButton onClick={() => close()}>
                    <Close />
                </IconButton>
            </Box>
        </Box>
    );
};
