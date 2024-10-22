import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import BackpackList from "./BackpackList";
import { useSelector } from "react-redux";
import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { skipToken } from "@reduxjs/toolkit/query";

const BackpackManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { earnerData } = useSelector((state) => state.global);

    const { data: badges } = useFetchBadgeByEarnerQuery(
        earnerData ? { earnerId: earnerData?.id, search: searchQuery } : skipToken,
    );
    console.log(earnerData.id, badges?.badgeClasses);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Backpack Management" />
            <SearchBar
                showButton={false}
                textInButton="Add Badge"
                badges={badges?.badgeClasses || []}
                onSearchChange={handleSearchChange}
            >
                <BackpackList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BackpackManagement;
