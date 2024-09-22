// React Library
import { useState } from "react";

// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableEarner from "./TableEarner";
import SearchBar from "../../components/SearchBars/SearchBar";
import VerificationCheckUp from "./verificationCheckUp";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            <SearchBar onSearch={setSearchQuery} />
            <VerificationCheckUp  />
            <TableEarner searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
