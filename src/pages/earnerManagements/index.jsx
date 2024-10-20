// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableEarner from "./TableEarner";

import PageTitle from "../../components/PageTitle";
import VerificationsCheckUp from "./Verifications";
import TableEarnerInvitation from "./TableEarnerInvitation";
import CustomTabs from "../../components/tabs/customTabs";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const tabs = ["Earner List", "Invited Earners"];
    const tabContent = [TableEarner, TableEarnerInvitation];

    return (
        <DashboardContainer>
            <PageTitle
                title="Earner Managements"
                subtitle="Manage earner accounts, invite new earners, and track their statuses all in one place."
            />
            <VerificationsCheckUp />

            <CustomTabs tabs={tabs} tabContent={tabContent} searchQuery="" />
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
