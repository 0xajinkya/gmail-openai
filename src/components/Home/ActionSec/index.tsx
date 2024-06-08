import { Box, SelectChangeEvent } from "@mui/material";
import { MainSelect, OutlinedButton } from "@/components";

/**
 * Component for the action section, including selecting the number of emails and classifying them.
 * @param num - The number of emails to display.
 * @param handleChange - Function to handle changes in the number of emails.
 * @param classify - Function to classify emails.
 */
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
            {/* Select component for choosing the number of emails */}
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
            {/* Button for classifying emails */}
            <OutlinedButton title="Classify" onClick={() => classify()}/>
        </Box>
    );
};
