// utils/sortOptions.js
import { Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const getSortOptions = (ascValue, descValue) => [
    {
        value: ascValue,
        label: (
            <Box display="flex" alignItems="center">
                <ArrowUpwardIcon fontSize="small" />
                <Box ml={1}>ASC</Box>
            </Box>
        ),
    },
    {
        value: descValue,
        label: (
            <Box display="flex" alignItems="center">
                <ArrowDownwardIcon fontSize="small" />
                <Box ml={1}>DES</Box>
            </Box>
        ),
    },
];
