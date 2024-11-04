// React library import
import { useSelector } from "react-redux";

// MUI import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom import
import TableEarner from "./TableEarner";

import PageTitle from "../../components/PageTitle";
import TableEarnerInvitation from "./TableEarnerInvitation";
import CustomTabs from "../../components/tabs/customTabs";

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
            {roleId === 3 ? <CustomTabs tabs={tabs} tabContent={tabContent} searchQuery="" /> : <TableEarner />}
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
