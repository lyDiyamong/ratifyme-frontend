import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import DashboardContainer from "../../components/styles/DashboardContainer";
import BadgeList from "./BadgeList";

const BadgeManagement = () => {
    const { roleId } = useSelector((state) => state.global);
    const allowRole = roleId === 3 ? true : false;
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Badge Management" subtitle="Monitor, assign, and manage all your digital badges with ease." />
            <SearchBar showButton={allowRole} textInButton="Add Badge">
                <BadgeList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BadgeManagement;
