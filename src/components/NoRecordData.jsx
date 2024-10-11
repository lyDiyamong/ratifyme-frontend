// MUI Import
import { Box, CardMedia } from "@mui/material";

// Custom Import
import StatusCode from "../assets/images/NoData.svg";

// =========== Start NoRecordData ===========
const NoRecordData = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <CardMedia
                component="img"
                image={StatusCode}
                alt="No earners found"
                sx={{ maxWidth: 400, width: "100%" }}
            />
        </Box>
    );
};

export default NoRecordData;
// =========== End NoRecordData ===========