// React Library
import { useState } from "react";

// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableEarner from "./TableEarner";

// For search bar please don't remove it because I will work with it in the next branch
// import SearchBar from "../../components/SearchBars/SearchBar";
import PageTitle from "../../components/PageTitle";
import VerificationsCheckUp from "./Verifications";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            {/* <SearchBarIssuer onSearch={setSearchQuery} /> */}
            {/* <SearchBar onSearch={setSearchQuery} /> */}
            <PageTitle
                title="Earner Managements"
                subtitle="Manage earner accounts, invite new earners, and track their statuses all in one place."
            />
            {/* <SearchBar onSearch={setSearchQuery} /> */}
            <VerificationsCheckUp  />
            <TableEarner searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
