import { Box, Modal, Slide } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { parseEmail } from "@/lib";
import { IEmail, IEmailPayload } from "@/utils";
import { EmailModalBody } from "../EmailModalBody";
import { EmailModalHeader } from "../EmailModalHeader";
import { EmailModalIFrame } from "../EmailModalIframe";

/**
 * Component for rendering the email modal.
 * @param activeEmail - The currently active email to display in the modal.
 * @param setActiveEmail - Function to set the active email.
 */
export const EmailModal = ({
    activeEmail,
    setActiveEmail,
}: {
    activeEmail: IEmail | null;
    setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
}) => {
    // Parse email sender information
    const sentBy = parseEmail(
        activeEmail?.payload.headers.filter((vl) => vl.name === "From")[0]
            .value as string
    );

    // Function to close the modal
    const close = () => setActiveEmail(null);

    return (
        <Modal
            open={Boolean(activeEmail)}
            sx={{
                display: "flex",
                justifyContent: ["flex-start", "flex-end"],
                alignItems: ["center"],
            }}
            onClose={() => close()}
        >
            <Slide in={Boolean(activeEmail)} direction="left">
                {activeEmail === null ? (
                    <></>
                ) : (
                    <Box
                        sx={{
                            width: ["100vw", "50vw"],
                            height: "100vh",
                            backgroundColor: "white",
                            color: "black",
                            borderTopLeftRadius: ["0px", "20px"],
                            borderTopRightRadius: ["0px", "0px"],
                            borderBottomLeftRadius: ["0px", "20px"],
                            borderBottomRightRadius: ["0px", "0px"],
                        }}
                    >
                        <Box
                            sx={{
                                px: "20px",
                                py: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            {/* Render email modal header */}
                            <EmailModalHeader
                                close={close}
                                sentBy={sentBy}
                                classification={activeEmail.classification}
                            />
                            {/* Render email modal body */}
                            <EmailModalBody
                                subject={
                                    activeEmail?.payload.headers.filter(
                                        (vl) => vl.name === "Subject"
                                    )[0].value
                                }
                                snippet={activeEmail?.snippet}
                            />
                            {/* Render email modal iframe */}
                            <EmailModalIFrame
                                payload={activeEmail?.payload as IEmailPayload}
                            />
                        </Box>
                    </Box>
                )}
            </Slide>
        </Modal>
    );
};
