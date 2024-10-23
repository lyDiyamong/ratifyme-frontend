// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import TableReport from "./TableReport";
import TableChart from "./TableChart";

// ============ Start Report Page ============
const reportManagement = () => {
    return (
        <DashboardContainer>
           
            <TableChart />
            <TableReport />
        </DashboardContainer>
    );
};

export default reportManagement;
// ============ End Report Page ============
