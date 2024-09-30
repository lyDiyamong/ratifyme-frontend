//React Libray
import { useState } from "react";

// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import AnBSchoolLogo from "../../assets/images/AnBSchoolLogo.svg";
import DashboardContainer from "../../components/styles/DashboardContainer";
import InviteIssuerPage from "./InviteIssuerPage";
import TableIssuer from "./TableIssuer";
import SearchBar from "../../components/SearchBars/SearchBar";

const IssuerManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <DashboardContainer>
            {/* <SearchBar onSearch={setSearchQuery} /> */}
            {/* <OrganizationCard
                tag="ORGANIZATION"
                title="Above & Beyond School"
                description="Above & Beyond School students go through the learning path by following the core courses, the recommended courses,and the capstone project. Other than these, they can access +20,000 contents in the A&B LMS to sharpen specific skills."
                logoUrl={AnBSchoolLogo}
                date="Mon 19, Aug 2024"
                showFacebook={true}
                showLinkedIn={true}
            /> */}
            <InviteIssuerPage />
            <TableIssuer searchQuery={searchQuery} />
        </DashboardContainer>
    );
};

export default IssuerManagement;
