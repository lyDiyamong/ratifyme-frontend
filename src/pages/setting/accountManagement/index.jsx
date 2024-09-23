// Custom import
import PageTitle from "../../../components/PageTitle";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import UserProfile from "./UserProfile"
import BioContent from "./BioContent"

const AccountManagement = () => {
    return (
        <DashboardContainer sx={{display : "flex", gap:3, flexDirection: "column", mb: 3}} >
            <PageTitle title="Profile" />
            <UserProfile />
            <BioContent />
        </DashboardContainer>
    );
};

export default AccountManagement;
