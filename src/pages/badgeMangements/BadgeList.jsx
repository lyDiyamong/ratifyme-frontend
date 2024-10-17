import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchBadgesQuery } from "../../store/api/badgeManagement/badgeApi";
import BadgeListCard from "../../components/BadgeListCard";
import { SpinLoading } from "../../components/loading/SpinLoading";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

const BadgeList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(5);

    const navigate = useNavigate();
    const { roleId, issuerData, institutionData } = useSelector((state) => state.global);
    const isSmallScreen = window.innerWidth < 600;

    let activeId = null;
    let field = null;

    switch (roleId) {
        case 2:
            activeId = institutionData?.id;
            field = "institutionId";
            break;
        case 3:
            activeId = issuerData?.id;
            field = "issuerId";
            break;
        default:
            return <div>Invalid roleId</div>;
    }

    const {
        data: allBadges,
        isLoading,
        isError,
    } = useFetchBadgesQuery({ field, fk: activeId, limit, page }, { skip: !activeId });

    useEffect(() => {
        if (activeId && field) {
            window.history.replaceState(null, "", `?page=${page}&${field}=${activeId}&limit=${limit}`);
        }
    }, [page, limit, field, activeId]);
    if (isLoading) return <SpinLoading size={30} />;
    if (isError) return <div>Error loading badges.</div>;
    if (!allBadges || !allBadges.data.length) return <div>No badges found.</div>;

    // If the number of returned badges is less than the limit, it means you're on the last page
    const totalPages = allBadges.data.length === limit ? page + 1 : page;

    const onPage = (newPage) => {
        setPage(newPage);
    };

    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={allBadges.data} onView={handleView} roleId={roleId} total={allBadges?.total} />

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Pagination
                    count={totalPages || 1} // Ensure at least 1 page is displayed
                    page={page}
                    onChange={(event, value) => onPage(value)}
                    size={isSmallScreen ? "small" : "large"}
                    siblingCount={isSmallScreen ? 0 : 1}
                    boundaryCount={isSmallScreen ? 1 : 2}
                />
            </Box>
        </>
    );
};

export default BadgeList;
