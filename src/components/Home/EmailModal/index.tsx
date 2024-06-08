import { parseEmail } from "@/lib";
import { IEmail, IEmailPayload } from "@/utils";
import { Box, Modal, Slide } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { EmailModalBody } from "../EmailModalBody";
import { EmailModalHeader } from "../EmailModalHeader";
import { EmailModalIFrame } from "../EmailModalIframe";

export const EmailModal = ({
  activeEmail,
  setActiveEmail,
}: {
  activeEmail: IEmail | null;
  setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
}) => {
  const sentBy = parseEmail(
    activeEmail?.payload.headers.filter((vl) => vl.name === "From")[0]
      .value as string
  );
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
              <EmailModalHeader
                close={close}
                sentBy={sentBy}
                classification={activeEmail.classification}
              />
              <EmailModalBody
                subject={
                  activeEmail?.payload.headers.filter(
                    (vl) => vl.name === "Subject"
                  )[0].value
                }
                snippet={activeEmail?.snippet}
              />
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
