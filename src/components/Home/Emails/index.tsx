import { Box, CircularProgress } from "@mui/material";
import { EmailCard } from "../EmailCard";
import { Dispatch, SetStateAction } from "react";
import { IEmail } from "@/utils";

/**
 * Component for displaying a list of emails.
 * @param emails - An array of email objects to display.
 * @param loading - A boolean indicating whether emails are loading.
 * @param setActiveEmail - Function to set the active email when clicked.
 */
export const Emails = ({
    emails,
    loading,
    setActiveEmail,
}: {
    emails: IEmail[];
    loading: boolean;
    setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                height: ["68vh", "60vh"],
                overflowY: "scroll",
                justifyContent: loading ? "center" : "auto",
                alignItems: loading ? "center" : "auto",
            }}
            className={"scrollable"}
        >
            {loading && <CircularProgress sx={{ color: "white" }} />}
            {!loading &&
                emails?.map((e, idx) => (
                    <EmailCard key={idx} email={e} setActiveEmail={setActiveEmail} />
                ))}
        </Box>
    );
};
