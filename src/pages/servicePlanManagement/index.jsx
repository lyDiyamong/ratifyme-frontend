// MUI import
import { Box } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import theme from "../../assets/themes";
import ServicePlanCard from "../../components/cards/ServicePlanCard";

const ServicePlanManagement = () => {
    return (
        // ============ Start ServicePlanManagement ============
        <DashboardContainer>
            {/* Page Title component */}
            <PageTitle
                title="Service Plans"
                subtitle="Efficiently manage and customize service plans for your digital badge programs, ensuring optimal engagement and recognition for achievements."
            />
            <Box
                component="section"
                sx={{
                    bgcolor: theme.palette.customColors.white,
                    mt: 4,
                    p: 4,
                    borderRadius: theme.customShape.section,
                    boxShadow: theme.customShadows.default,
                }}
            >
                <ServicePlanCard />
            </Box>
        </DashboardContainer>
        // ============ End ServicePlanManagement ============
    );
};

export default ServicePlanManagement;
