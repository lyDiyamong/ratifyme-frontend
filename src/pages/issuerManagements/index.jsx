//React Libray
import { useState } from "react";

// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import AnBSchoolLogo from "../../assets/images/AnBSchoolLogo.svg";
import DashboardContainer from "../../components/styles/DashboardContainer";
import InviteIssuerPage from "./InviteIssuerPage";
import TableIssuer from "./TableIssuer";
import SearchBar from "../../components/searchBars/SearchBar";
import PageTitle from "../../components/PageTitle";

const IssuerManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            {/* <SearchBar onSearch={setSearchQuery} /> */}
            {/* <InviteIssuerPage /> */}
            <PageTitle
                title="Issuer Managements"
                subtitle="Manage issuer accounts, invite new issuers, and track their statuses all in one place."
            />
            <TableIssuer searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default IssuerManagement;
