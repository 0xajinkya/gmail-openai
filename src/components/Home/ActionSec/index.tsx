import { MainSelect, OutlinedButton } from "@/components";
import { Box, SelectChangeEvent } from "@mui/material";

export const ActionSec = ({
  num,
  handleChange,
  classify
}: {
  num: number;
  handleChange: (event: SelectChangeEvent) => void;
  classify: () => void
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "120px",
        }}
      >
        <MainSelect
          name={"Emails"}
          fieldName="emails"
          onChange={handleChange}
          value={num}
          placeholder="Number of emails"
          required={true}
          values={[5, 10, 15, 20]}
        />
      </Box>
      <OutlinedButton title="Classify" onClick={() => classify()}/>
    </Box>
  );
};
