import { Button, ButtonProps } from "@mui/material";
import React from "react";

/**
 * OutlinedButton component for rendering an outlined button.
 * @param title - The title or text content of the button.
 * @param styles - Custom styles to be applied to the button.
 * @param onClick - Function to be called when the button is clicked.
 */
export const OutlinedButton = ({
    title,
    styles,
    onClick,
}: {
    title: string;
    styles?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <Button
            sx={{
                borderRadius: "15px",
                border: "1px solid white",
                color: "white",
                whiteSpace: "nowrap",
                fontSize: ["12px", "auto"],
                textTransform: "capitalize",
                ":hover": {
                    border: "1px solid white",
                },
                ...styles,
            }}
            onClick={onClick}
            variant="outlined"
        >
            {title}
        </Button>
    );
};
