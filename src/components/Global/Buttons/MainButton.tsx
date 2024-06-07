import { Button } from "@mui/material";
import React from "react";

interface MainButtonProps {
    title: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    styles?: object;
}

export const MainButton = ({ title, onClick, disabled = false, styles }: MainButtonProps) => {
    return (
        <Button
            sx={{
                // height:["50px"],
                px: "24px",
                py: "12px",
                borderRadius: "15px",
                boxShadow: "0px 9px 14px 0px rgba(255, 141, 77, 0.20)",
                background: disabled ? "#ccc" : "linear-gradient(90deg, #FF7348 0%, #FFA71D 100%)",
                color: "white",
                fontSize: ["12px", "auto"],
                cursor: disabled ? "not-allowed" : "pointer",
                ...styles
            }}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </Button>
    );
};
