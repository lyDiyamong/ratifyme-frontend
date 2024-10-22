import React, { useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import DashboardContainer from "../../components/styles/DashboardContainer";
import BadgeList from "./BadgeList";
import { useFetchBadgesQuery } from "../../store/api/badgeManagement/badgeApi";

const BadgeManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { roleId, issuerData, institutionData } = useSelector((state) => state.global);

    let activeId = null;
    let field = null;

    if (roleId === 2 && institutionData?.id) {
        activeId = institutionData.id;
        field = "institutionId";
    } else if (roleId === 3 && issuerData?.id) {
        activeId = issuerData.id;
        field = "issuerId";
    }

    const { data: badges } = useFetchBadgesQuery(field && activeId ? { field, fk: activeId, search: searchQuery } : skipToken);
    const allowRole = roleId === 3 ? true : false;

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Badge Management" subtitle="Monitor, assign, and manage all your digital badges with ease." />
            <SearchBar
                showButton={allowRole}
                textInButton="Add Badge"
                badges={badges?.data || []}
                onSearchChange={handleSearchChange}
            >
                <BadgeList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BadgeManagement;
