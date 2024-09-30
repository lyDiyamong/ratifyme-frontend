import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import BadgeList from "../badgeMangements/BadgeList";

const BackpackManagement = () => {
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="BackPack Management" />
            <SearchBar showButton={false} textInButton="Add Badge">
                <BadgeList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BackpackManagement;
