import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import AchievementList from "./AchievementList";

const AchievementManagement = () => {
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="My Achievement" />
            <SearchBar showButton={false} textInButton="Add Badge">
                <AchievementList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default AchievementManagement;
