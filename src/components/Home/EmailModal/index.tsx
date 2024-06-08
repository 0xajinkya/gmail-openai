import { IEmail } from "@/context";
import { parseEmail } from "@/lib";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
                {activeEmail.classification && (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "capitalize",
                      color:
                        activeEmail.classification === "important"
                          ? "green"
                          : activeEmail.classification === "marketing"
                          ? "yellow"
                          : activeEmail.classification === "spam"
                          ? "red"
                          : "grey",
                    }}
                  >
                    {activeEmail.classification}
                  </Typography>
                )}
                <IconButton onClick={() => close()}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {
                activeEmail?.payload.headers.filter(
                  (vl) => vl.name === "Subject"
                )[0].value
              }
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {activeEmail?.snippet}
            </Typography>
            <Box
              sx={{
                width: ["100%", "40vw"],
                height: ["60vh"],
                borderRadius: "16px",
              }}
            >
              <iframe
                srcDoc={
                  activeEmail?.payload.body.size !== 0
                    ? Buffer.from(
                        activeEmail?.payload.body.data as string,
                        "base64"
                      ).toString("ascii")
                    : Buffer.from(
                        activeEmail.payload.parts.filter((pt) =>
                          pt.mimeType.includes("html")
                        )[0].body.data,
                        "base64"
                      ).toString("ascii")
                }
                className="scrollable"
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};
