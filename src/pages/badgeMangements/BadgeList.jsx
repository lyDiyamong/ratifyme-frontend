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
    const [limit] = useState(1);

    const navigate = useNavigate();
    const { roleId, issuerData, institutionData } = useSelector((state) => state.global);
    const isSmallScreen = window.innerWidth < 600;

    let activeId = null;
    let field = null;

    // Only set activeId and field when the roleId is valid
    if (roleId === 2 && institutionData?.id) {
        activeId = institutionData.id;
        field = "institutionId";
    } else if (roleId === 3 && issuerData?.id) {
        activeId = issuerData.id;
        field = "issuerId";
    }

    // Avoid fetching if activeId is null or field is not defined
    const {
        data: allBadges,
        isLoading,
        isError,
    } = useFetchBadgesQuery({ field, fk: activeId, limit, page }, { skip: !activeId || !field });

    useEffect(() => {
        if (activeId && field) {
            window.history.replaceState(null, "", `?page=${page}&${field}=${activeId}&limit=${limit}`);
        }
    }, [page, limit, field, activeId]);

    // Display a message for invalid roleId outside of the core logic
    if (!activeId || !field) return <div>Invalid roleId</div>;

    if (isLoading) return <SpinLoading size={30} />;
    if (isError) return <div>Error loading badges.</div>;
    if (!allBadges || !allBadges.data.length) return <div>No badges found.</div>;

    // If the number of returned badges is less than the limit, it means you're on the last page
    const totalPages = Math.ceil(allBadges?.total / limit);

    const onPage = (newPage) => {
        setPage(newPage);
    };

    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={allBadges.data} onView={handleView} roleId={roleId} total={allBadges?.total} />

            <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
                <Pagination
                    count={totalPages || 1}
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
