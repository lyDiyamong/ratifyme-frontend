// React Library Import
import { useSelector } from "react-redux";

// Custom Import
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import CustomTabs from "../../components/tabs/customTabs";
import TableEarner from "./TableEarner";
import TableEarnerInvitation from "./TableEarnerInvitation";
import VerificationsCheckUp from "./Verifications";

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

            {roleId === 3 ? <CustomTabs tabs={tabs} tabContent={tabContent} searchQuery="" /> : <TableEarner />}
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============
