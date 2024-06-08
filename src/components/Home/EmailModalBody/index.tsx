import { Box, Typography } from "@mui/material";

/**
 * Component for rendering the body of the email modal.
 * @param subject - The subject of the email.
 * @param snippet - A brief snippet of the email content.
 */
export const EmailModalBody = ({
    subject,
    snippet,
}: {
    subject: string;
    snippet: string;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            {/* Render email subject */}
            <Typography
                sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                }}
            >
                {subject}
            </Typography>
            {/* Render email snippet */}
            <Typography
                sx={{
                    fontSize: "11px",
                    fontWeight: 500,
                }}
            >
                {snippet}
            </Typography>
        </Box>
    );
};
