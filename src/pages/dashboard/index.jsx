import Greeting from "./Greeting";
import PageTitle from "../../components/PageTitle";
import { Stack } from "@mui/material";
import Overview from "./Overview";

const Dashboard = () => {
    return (
        <Stack gap={3}>
            <PageTitle title="Dashboard"/>
            <Greeting userName="John Smith"/>
            <Overview  />
        </Stack>
    );
};

export default Dashboard;
