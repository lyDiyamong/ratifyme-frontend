// Custom import
import PageTitle from "../../../components/PageTitle";
import ChangePasswordForm from "./ChangePasswordForm";
import DashboardContainer from "../../../components/styles/DashboardContainer";

const ChangePassword = () => {
    return (
        <DashboardContainer>
            <PageTitle title="Change Password" />
            <ChangePasswordForm />
        </DashboardContainer>
    );
};

export default ChangePassword;
