// React import
import { useEffect } from "react";
import { useNavigate } from "react-router";

// MUI import
import { Typography } from "@mui/material";

// Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import ServicePlanCard from "../../components/cards/ServicePlanCard";
import theme from "../../assets/themes";

// API import
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

const PricePage = () => {
    const { data, error, isLoading } = useCheckAuthQuery();
    const user = data?.user || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                navigate("/auth/signup");
            }
        }
    }, [isLoading, error, user, navigate]);

    return (
        // ============ Start servicePlanSection ============
        <LandingContainer>
            <Typography
                sx={{
                    fontWeight: theme.fontWeight.extraBold,
                    textAlign: "center",
                    fontSize: "48px",
                    maxWidth: "800px",
                    mx: "auto",
                    mt: "56px",
                }}
            >
                Pick up a plan to generate certificates and badges
            </Typography>
            <Typography textAlign="center">Trusted for simplicity, time-efficiency, and professional impact</Typography>
            <ServicePlanCard />
        </LandingContainer>
        // ============ End servicePlanSection ============
    );
};

export default PricePage;
