import { Stack } from "@mui/material";

// Custom import
import PageTitle from "../../../components/PageTitle";
import ChangePasswordForm from "./ChangePasswordForm";

const PrivacySecurityManagement = () => {
    return <Stack gap={3}>
        <PageTitle title="Change Password"/>
        <ChangePasswordForm />
    </Stack>;
};

export default PrivacySecurityManagement;
