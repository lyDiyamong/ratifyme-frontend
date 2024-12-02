import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import theme from "../../../assets/themes";

const CopyToClipboardBox = ({ credUrl }) => {
    const [copyStatus, setCopyStatus] = useState("Copy");

    const handleCopy = () => {
        navigator.clipboard
            .writeText(credUrl)
            .then(() => {
                setCopyStatus("Copied");
                setTimeout(() => setCopyStatus("Copy"), 2000);
            })
            .catch(() => {
                console.error("Failed to copy the text.");
            });
    };

    return (
        <Box
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: theme.palette.customColors.white,
                borderRadius: theme.customShape.input,
                border: "1px solid #F5F5F7",
            }}
        >
            <Stack spacing={2}>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <CopyAll
                        onClick={handleCopy}
                        sx={{ cursor: "pointer", color: copyStatus === "Copied" ? "green" : "inherit" }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: theme.fontWeight.semiBold, color: copyStatus === "Copied" ? "green" : "inherit" }}
                    >
                        {copyStatus}
                    </Typography>
                </Stack>
                <Typography variant="body1">Your credential unique URL, copy it to showcase your skills!</Typography>
            </Stack>  
        </Box>
    );
};

export default CopyToClipboardBox;
