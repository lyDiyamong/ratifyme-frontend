// MUI Import
import { Box, CardMedia, Typography } from "@mui/material";

// Custom Import
import StatusCode from "../assets/images/NoData.svg";

const NoRecordData = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <CardMedia
                component="img"
                image={StatusCode}
                alt="No earners found"
                sx={{ maxWidth: 400, width: "100%" }}
            />
            <Typography variant="h6" mt={2} textAlign="center" color="text.secondary">
                No earners found. Try adjusting your search criteria.
            </Typography>
        </Box>
    );
};

export default NoRecordData;
