import Greeting from "./Greeting";
import PageTitle from "../../components/PageTitle";
import Overview from "./Overview";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import AlertMessage from "../../components/alert/AlertMessage";
import { useEffect, useState } from "react";

const Dashboard = () => {
    // CheckAuth if success hook
    const { isSuccess } = useCheckAuthQuery();
    // Log in success state
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check if the message has already been shown in localStorage
        const isMessageShown = localStorage.getItem("loginMessageShown");

        if (isSuccess && !isMessageShown) {
            setMessage("Sign in successfully");
            // Set flag to avoid showing again
            localStorage.setItem("loginMessageShown", "true");
        }
    }, [isSuccess]);

    return (
        <DashboardContainer sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
            {message && (
                <AlertMessage variant="success" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <PageTitle title="Dashboard" />
            <Greeting userName="John Smith" />
            <Overview />
        </DashboardContainer>
    );
};

export default Dashboard;
