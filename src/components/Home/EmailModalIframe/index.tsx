import { IEmailPayload } from "@/utils";
import { Box } from "@mui/material";

export const EmailModalIFrame = ({ payload }: { payload: IEmailPayload }) => {
  const src =
    payload.body.size !== 0
      ? Buffer.from(payload.body.data as string, "base64").toString("ascii")
      : payload.parts.filter((vl) => vl.mimeType.includes("html")).length > 0
      ? Buffer.from(
          payload.parts.filter((pt) => pt.mimeType.includes("html"))[0].body
            .data,
          "base64"
        ).toString("ascii")
      : Buffer.from(
          payload.parts
            .filter((pt) => pt.mimeType.includes("alternative"))[0]
            .parts?.filter((pt) => pt.mimeType.includes("html"))[0].body
            .data as string,
          "base64"
        ).toString("ascii");

  return (
    <Box
      sx={{
        width: ["100%", "40vw"],
        height: ["60vh"],
        borderRadius: "16px",
      }}
    >
      <iframe
        srcDoc={src}
        className="scrollable"
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
      />
    </Box>
  );
};
