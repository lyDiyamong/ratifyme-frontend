import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import { AchievementList } from "./AchievementList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { skipToken } from "@reduxjs/toolkit/query";

const AchievementManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");
    const { earnerData } = useSelector((state) => state.global);

    // Fetch badges using the search query and earner ID
    const {
        data: badges,
        isLoading,
        isError,
    } = useFetchBadgeByEarnerQuery(earnerData ? { earnerId: earnerData.id, search: searchQuery, page, limit } : skipToken);

    // State to store the result, initialized with totalRecords or 0
    const [result, setResult] = useState(badges?.totalRecords || 0);
    console.log();

    // Use useEffect to update the result when badges data changes
    useEffect(() => {
        if (badges?.totalRecords) {
            setResult(badges?.results);
        } else if (badges?.results) {
            setResult(badges.totalRecords);
        } else {
            setResult(0);
        }
    }, [badges]);

    const onPage = (newPage) => {
        setPage(newPage);
    };

    // Handle search query changes
    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle title="My Achievement" />
            <SearchBar
                showButton={false}
                textInButton="Add Badge"
                badges={badges?.badgeClasses || []}
                onSearchChange={handleSearchChange}
                total={badges?.totalRecords || 0}
                onPage={onPage}
                limit={limit || []}
                page={page || []}
                result={result || []}
                isError={isError}
                isLoading={isLoading}
            >
                <AchievementList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default AchievementManagement;
