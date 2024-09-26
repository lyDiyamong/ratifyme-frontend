import Greeting from "./Greeting";
import PageTitle from "../../components/PageTitle";
import Overview from "./Overview";
import DashboardContainer from "../../components/styles/DashboardContainer";

const Dashboard = () => {
    return (
        <DashboardContainer sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
            <PageTitle title="Dashboard" />
            <Greeting userName="John Smith" />
            <Overview />
        </DashboardContainer>
    );
};

export default Dashboard;
