// React import
import { useEffect, useState } from "react";

// MUI import
import { Grid, useMediaQuery } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import AlertMessage from "../../components/alert/AlertMessage";
import CodeInvitationCard from "../../components/cards/CodeInvitationCard";
import Greeting from "./Greeting";
import Overview from "./Overview";

// API import
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

const Dashboard = () => {
    // CheckAuth if success hook
    const { isSuccess } = useCheckAuthQuery();
    // Log in success state
    const [message, setMessage] = useState("");

    const isBelow1500px = useMediaQuery("(max-width:1500px)");

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
            <PageTitle title="Dashboard" subtitle="Track and manage all digital badges across your organizations." />
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={isBelow1500px ? 6 : 8}>
                    <Greeting userName="John Smith" />
                </Grid>
                <Grid item xs={12} md={6} lg={isBelow1500px ? 6 : 4}>
                    <CodeInvitationCard />
                </Grid>
            </Grid>
            <Overview />
        </DashboardContainer>
    );
};

export default Dashboard;
