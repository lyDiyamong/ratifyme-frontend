import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import DashboardContainer from "../../components/styles/DashboardContainer";
import BadgeList from "./BadgeList";
import { useFetchBadgesQuery } from "../../store/api/badgeManagement/badgeApi";
import { display } from "@mui/system";

const BadgeManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

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

    const [result, setResult] = useState(badges?.total || 0);

    useEffect(() => {
        if (badges?.total) {
            setResult(badges?.results);
        } else if (badges?.results) {
            setResult(badges?.total);
        } else {
            setResult(0);
        }
    }, [badges]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const onPage = (newPage) => {
        setPage(newPage);
    };

    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="Badge Management" subtitle="Monitor, assign, and manage all your digital badges with ease." />
            <SearchBar
                showButton={allowRole}
                textInButton="Add Badge"
                badges={badges?.data || []}
                onSearchChange={handleSearchChange}
                total={badges?.total || 0}
                onPage={onPage}
                limit={limit || []}
                page={page || []}
                result={result || []}
            >
                <BadgeList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BadgeManagement;
