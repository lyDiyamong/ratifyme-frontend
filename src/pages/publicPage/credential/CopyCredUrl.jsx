import { Box, Typography, Stack } from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import theme from "../../../assets/themes";

const CopyCredUrl = ({ credUrl }) => {
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
                    <CopyAll />
                    <Typography variant="h5">Copy</Typography>
                </Stack>
                <Typography variant="body1">Your credential unique URL, copy it to showcase your skills!</Typography>
            </Stack>
        </Box>
    );
};

export default CopyCredUrl;
