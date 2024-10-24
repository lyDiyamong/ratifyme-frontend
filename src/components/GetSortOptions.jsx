// MUI import
import { Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

// =========== Start getSortOptions ===========
const getSortOptions = (ascValue, descValue) => [
    {
        value: ascValue,
        label: (
            <Box display="flex" alignItems="center">
                <ArrowUpward fontSize="small" />
                <Box ml={1}>ASC</Box>
            </Box>
        ),
    },
    {
        value: descValue,
        label: (
            <Box display="flex" alignItems="center">
                <ArrowDownward fontSize="small" />
                <Box ml={1}>DES</Box>
            </Box>
        ),
    },
];

export default getSortOptions;
// =========== End getSortOptions ===========