import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../../components/PageTitle";
import ChangePasswordForm from "./ChangePasswordForm";
import DashboardContainer from "../../../components/styles/DashboardContainer";

const PrivacySecurityManagement = () => {
    return (
        <DashboardContainer>
            <PageTitle title="Change Password" />
            <ChangePasswordForm />
        </DashboardContainer>
    );
};

export default PrivacySecurityManagement;
