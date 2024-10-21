import { Avatar, Box, Typography } from "@mui/material";

export const TableAvatars = ({ profileImage, name }) => {
    return (
        <Box style={{ display: "flex", alignItems: "center" }}>
            <Avatar
                src={profileImage || ""}
                alt={name}
                sx={{
                    bgcolor: profileImage ? "transparent" : "#ccc",
                    width: "32px",
                    height: "32px",
                }}
            >
                {/* Use the first letter of the name if no image is available */}
                {!profileImage && name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" style={{ marginLeft: "8px" }}>
                {name || "N/A"}
            </Typography>
        </Box>
    );
};
