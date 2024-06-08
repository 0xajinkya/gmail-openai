import { Box, CircularProgress } from "@mui/material";
import { EmailCard } from "../EmailCard";
import { Dispatch, SetStateAction } from "react";
import { IEmail } from "@/utils";

export const Emails = ({
  emails,
  loading,
  setActiveEmail,
}: {
  emails: IEmail[];
  loading: boolean;
  setActiveEmail: Dispatch<SetStateAction<IEmail | null>>;
}) => {
  console.log(emails);

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
