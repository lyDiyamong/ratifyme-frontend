// Reacl library import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import BackpackList from "./BackpackList";

// API import
import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";

const BackpackManagement = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");
    const { earnerData } = useSelector((state) => state.global);

    const { data: badges } = useFetchBadgeByEarnerQuery(
        earnerData ? { earnerId: earnerData?.id, search: searchQuery } : skipToken,
    );

    const [result, setResult] = useState(badges?.totalRecords || 0);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

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
    return (
        <DashboardContainer sx={{ pb: 4 }}>
            <PageTitle
                title="Backpack Management"
                subtitle="Manage your digital badges and achievements in your personalized backpack, all organized in one convenient dashboard."
            />
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
            >
                <BackpackList />
            </SearchBar>
        </DashboardContainer>
    );
};

export default BackpackManagement;
