// React library import
import { useSelector } from "react-redux";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import CustomTabs from "../../components/tabs/customTabs";
import TableIssuer from "./TableIssuer";
import TableIssuerInvitation from "./TableIssuerInvitation";

// Issuer Management Component
const IssuerManagement = () => {
    const { roleId } = useSelector((state) => state.global);
    const tabs = ["Issuer List", "Invited Issuers"];
    const tabContent = [TableIssuer, TableIssuerInvitation];

    return (
        <DashboardContainer>
            <PageTitle
                title="Issuer Management"
                subtitle="Manage issuer accounts, invite new issuers, and track their statuses all in one place."
            />

            {roleId === 1 ? <TableIssuer /> : <CustomTabs tabs={tabs} tabContent={tabContent} searchQuery="" />}
        </DashboardContainer>
    );
};

export default IssuerManagement;
