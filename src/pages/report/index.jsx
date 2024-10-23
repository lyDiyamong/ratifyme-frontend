// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableReport from "./TableReport";
import PageTitle from "../../components/PageTitle";
// ============ Start Report Page ============
const reportManagement = () => {
    return (
        <DashboardContainer>
            <PageTitle
                title="Report Management"
                subtitle="Manage All the institution with the total amount of Issuers, Earners and Badges that institution."
            />
            <TableReport />
        </DashboardContainer>
    );
};

export default reportManagement;
// ============ End Report Page ============
