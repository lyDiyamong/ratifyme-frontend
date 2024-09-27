// MUI import
import { Box } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import ServiceDetail from "../../components/ServiceDetail";
import DashboardContainer from "../../components/styles/DashboardContainer";
import theme from "../../assets/themes";

const ServicePlanManagement = () => {
    return (
        // ============ Start ServicePlanManagement ============
        <DashboardContainer>
            {/* Page Title component */}
            <PageTitle title="Service Plans" />
            {/* ServiceDetail container */}
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
                {/* Service detail component */}
                <ServiceDetail />
            </Box>
        </DashboardContainer>
        // ============ End ServicePlanManagement ============
    );
};

export default ServicePlanManagement;
