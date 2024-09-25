import { Box, Paper } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import ServiceDetail from "../../components/ServiceDetail";
import DashboardContainer from "../../components/styles/DashboardContainer";
import theme from "../../assets/themes";
import shadows from "@mui/material/styles/shadows";

const ServicePlanManagement = () => {
    return (
        <DashboardContainer>
            <PageTitle title="Service Plans" />
            <Box sx={{
                bgcolor: theme.palette.customColors.white,
                mt: 4,
                p: 4,
                borderRadius : theme.customShape.section,
                boxShadow : theme.customShadows.default
            }} >
                <ServiceDetail />
            </Box>
        </DashboardContainer>
    );
};

export default ServicePlanManagement;
