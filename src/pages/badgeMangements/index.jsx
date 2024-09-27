import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import DashboardContainer from "../../components/styles/DashboardContainer";
import BadgeList from "./BadgeList";

const BadgeManagement = () => {
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Badge Management " />
            <SearchBar showButton={true} textInButton="Add Badge">
                <BadgeList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BadgeManagement;
