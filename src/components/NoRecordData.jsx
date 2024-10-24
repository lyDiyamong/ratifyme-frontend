// MUI import
import { Box, CardMedia } from "@mui/material";

// Custom import
import StatusCode from "../assets/images/NoData.svg";

// =========== Start NoRecordData ===========
// this component using when user try to search data but the data not found and doesn't have data yet
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