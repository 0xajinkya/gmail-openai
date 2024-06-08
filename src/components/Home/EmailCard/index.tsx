import { parseEmail } from "@/lib";
import { IEmail } from "@/utils";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

/**
 * Component for rendering an email card.
 * @param email - The email object to render.
 * @param setActiveEmail - Function to set the active email.
 */
export const EmailCard = ({
    email,
    setActiveEmail,
}: {
    email: IEmail;
    setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
}) => {
    // Parse email sender information
    const parsedFrom = parseEmail(
        email.payload.headers.filter((vl) => vl.name === "From")[0].value
    );

    return (
        <Box
            sx={{
                border: "2px solid grey",
                borderRadius: "12px",
                px: "20px",
                py: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                cursor: "pointer",
            }}
            onClick={() => setActiveEmail(email)}
        >
            {/* Render parsed sender information */}
            {typeof parsedFrom === "string" ? (
                <Typography>{parsedFrom}</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: ["flex-start", "center"],
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: ["4px", "16px"],
                            flexDirection: ["column", "row"],
                            alignItems: ["flex-start", "center"],
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                            }}
                        >
                            {parsedFrom.name.replace(/['"]/g, "")}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "11px",
                                color: "grey",
                            }}
                        >
                            {parsedFrom.email}
                        </Typography>
                    </Box>
                    {/* Render email classification */}
                    {email.classification && (
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: "14px",
                                textTransform: "capitalize",
                                color:
                                    email.classification === "important"
                                        ? "green"
                                        : email.classification === "marketing"
                                        ? "yellow"
                                        : email.classification === "spam"
                                        ? "red"
                                        : "grey",
                            }}
                        >
                            {email.classification}
                        </Typography>
                    )}
                </Box>
            )}
            {/* Render email subject */}
            <Typography>
                {email.payload.headers.filter(
                    (vl) => vl.name === "Subject"
                )[0].value}
            </Typography>
            {/* Render email snippet */}
            <Typography
                sx={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.5)",
                }}
            >
                {email.snippet}
            </Typography>
        </Box>
    );
};
