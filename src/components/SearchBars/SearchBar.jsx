// React Library
import { useState } from "react";

// MUI Import
import { Box } from "@mui/material";

// Custom Import
import SearchBarCustom from "./SearchBarCustom";

// =========== Start Search Bar Issuer ===========
const SearchBarIssuer = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <Box>
            <SearchBarCustom onSearch={handleSearch} />
        </Box>
    );
};

export default SearchBarIssuer;
// =========== End Search Bar Issuer ===========
