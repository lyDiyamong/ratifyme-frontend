import { Typography } from "@mui/material";

export default function HelperTextForm({ message, color="error" }) {
    return <Typography sx={{ fontSize: 12, mx: "14px", mt: "1px"}} color={color}>{message}</Typography>;
}
