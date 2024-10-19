// Custom Imports
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableIssuer from "./TableIssuer";
import TableIssuerInvitation from "./TableIssuerInvitation";
import PageTitle from "../../components/PageTitle";
import CustomTabs from "../../components/tabs/customTabs";

// Issuer Management Component
const IssuerManagement = () => {

    const tabs = ["Issuer List", "Invited Issuers"];
    const tabContent = [TableIssuer, TableIssuerInvitation];

    return (
        <DashboardContainer>
            <PageTitle
                title="Issuer Management"
                subtitle="Manage issuer accounts, invite new issuers, and track their statuses all in one place."
            />

            <CustomTabs
                tabs={tabs}
                tabContent={tabContent}
                searchQuery=""
            />
        </DashboardContainer>
    );
};

export default IssuerManagement;
