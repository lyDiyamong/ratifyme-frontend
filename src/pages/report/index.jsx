// React Library
import { useState } from "react";

// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableReport from "./TableReport";
import SearchBar from "../../components/searchBars/SearchBar";
import TableChart from "./TableChart";

// ============ Start Report Page ============
const reportManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            <SearchBar onSearch={setSearchQuery} />
            <TableChart />
            <TableReport searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default reportManagement;
// ============ End Report Page ============
