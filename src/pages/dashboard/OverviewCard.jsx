// React Library
import { useEffect, useState } from "react";

// MUI Import
import { Box, Typography } from "@mui/material";

//Custom Import
import { createCardContent } from "./OverviewCardFetch";
import theme from "../../assets/themes";
import PageLoading from "../../components/loading/PageLoading";

// Fetching Data
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useFetchBadgeByEarnerQuery, useFetchClaimBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useSelector } from "react-redux";

// =========== Start Overview Card ===========
const CardsList = () => {
    // Redux toolkit hook
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const { userId, roleId, earnerData } = useSelector((state) => state.global);
    const { data: badge, isLoading: badgeLoading } = useFetchBadgeByEarnerQuery(
        { earnerId: earnerData?.id },
        { skip: !earnerData },
    );
    const { data: claimedBadge } = useFetchClaimBadgeByEarnerQuery({ earnerId: earnerData?.id }, { skip: !earnerData });
    const [cardContents, setCardContents] = useState([]);

    useEffect(() => {
        if (response && roleId) {
            const cardData = createCardContent(roleId, response?.data, userId, badge, claimedBadge) || [];
            setCardContents(cardData);
        }
    }, [response, userId, badge, roleId, claimedBadge]);

    if (isLoading || badgeLoading) return <PageLoading isLoading={isLoading || badgeLoading} />;
    if (isError) return <Typography color="error">Error fetching data</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexDirection: {
                    sm: "row",
                    xss: "column",
                },
            }}
        >
            {cardContents?.map(({ title, image, icon, value }, index) => (
                <Box
                    key={title || index}
                    sx={{
                        flex: 1,
                        p: 3,
                        py: 5,
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                            sm: "column",
                            xss: "row",
                        },
                        alignItems: {
                            sm: "flex-start",
                            xss: "center",
                        },
                        borderRadius: theme.customShape.card,
                        boxShadow: theme.customShadows.default,
                        backgroundColor: theme.palette.customColors.white,
                    }}
                >
                    <img src={image} style={{ maxWidth: 100, width: "100%" }} alt={title} />
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{ color: theme.palette.text.disabled, fontWeight: theme.fontWeight.semiBold }}
                        >
                            {value}
                            <img src={icon} alt={`${title} icon`} style={{ marginBottom: "16px" }} />
                        </Typography>

                        <Typography variant="body3" sx={{ color: theme.palette.text.primary }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default CardsList;
// =========== End Overview Card ===========
