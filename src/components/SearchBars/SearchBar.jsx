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
        onSearch(query); // Pass the query up to the parent component
    };

    return (
        <Box>
            <SearchBarCustom onSearch={handleSearch} />
        </Box>
    );
};

export default SearchBarIssuer;
// =========== End Search Bar Issuer ===========
