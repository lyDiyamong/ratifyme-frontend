import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import BadgeList from "../badgeMangements/BadgeList";
import BackpackList from "./BackpackList";

const BackpackManagement = () => {
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Backpack Management" />
            <SearchBar showButton={false} textInButton="Add Badge">
                <BackpackList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BackpackManagement;
