// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableEarner from "./TableEarner";

import PageTitle from "../../components/PageTitle";
import VerificationsCheckUp from "./Verifications";
import TableEarnerInvitation from "./TableEarnerInvitation";
import CustomTabs from "../../components/tabs/customTabs";
import { useSelector } from "react-redux";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const tabs = ["Earner List", "Invited Earners"];
    const tabContent = [TableEarner, TableEarnerInvitation];
    const { roleId } = useSelector((state) => state.global);

    return (
        <DashboardContainer>
            <PageTitle
                title="Earner Managements"
                subtitle="Manage earner accounts, invite new earners, and track their statuses all in one place."
            />
            <VerificationsCheckUp />

            {roleId === 1 ? <TableEarner /> : <CustomTabs tabs={tabs} tabContent={tabContent} searchQuery="" />}
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
