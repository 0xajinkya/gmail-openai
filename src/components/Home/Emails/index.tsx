import { IEmail } from "@/context";
import { Box, CircularProgress } from "@mui/material";
import { EmailCard } from "../EmailCard";

export const Emails = ({
  emails,
  loading,
}: {
  emails: IEmail[];
  loading: boolean;
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
      {!loading && emails?.map((e, idx) => <EmailCard key={idx} email={e} />)}
    </Box>
  );
};
