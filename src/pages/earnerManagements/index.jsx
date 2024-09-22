// React Library
import { useState } from "react";

// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableEarner from "./TableEarner";
import SearchBar from "../../components/SearchBars/SearchBar";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            {/* <SearchBarIssuer onSearch={setSearchQuery} /> */}
            <SearchBar onSearch={setSearchQuery} />
            <TableEarner searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
