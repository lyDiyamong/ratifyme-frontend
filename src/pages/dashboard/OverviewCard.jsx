// React Library
import { useEffect, useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress, CardMedia } from "@mui/material";

// Custom Import
import blueGraphSvg from "../../assets/images/bluegraph.svg";
import purpleGraphSvg from "../../assets/images/purplegraph.svg";
import yellowGraphSvg from "../../assets/images/yellowgraph.svg";
import blueArrowSvg from "../../assets/icons/bluearrow.svg";
import purpleArrowSvg from "../../assets/icons/purplearrow.svg";
import yellowgraphArrowSvg from "../../assets/icons/yellowarrow.svg";

// Fetching Data
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import theme from "../../assets/themes";

// ============ Start card list dashboard ============
const createCardContent = (totalInstitutions, totalIssuers, totalEarners) => [
    {
        image: blueGraphSvg,
        title: "Total Institution",
        icon: blueArrowSvg,
        value: totalInstitutions,
    },
    {
        image: purpleGraphSvg,
        title: "Total Issuer",
        icon: purpleArrowSvg,
        value: totalIssuers,
    },
    {
        image: yellowGraphSvg,
        title: "Total Earner",
        icon: yellowgraphArrowSvg,
        value: totalEarners,
    },
];

// Cards Component
const CardsList = () => {
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const [cardContents, setCardContents] = useState([]);

    useEffect(() => {
        if (response) {
            const totalInstitutions = response.data.length;
            const totalIssuers = response.data.reduce((total, institution) => total + institution.Issuers.length, 0);
            const totalEarners = response.data.reduce(
                (total, institution) =>
                    total +
                    institution.Issuers.reduce((issuerTotal, issuer) => issuerTotal + (issuer.Earners?.length || 0), 0),
                0,
            );

            setCardContents(createCardContent(totalInstitutions, totalIssuers, totalEarners));
        }
    }, [response]);

    if (isLoading) return <CircularProgress />;
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
            {cardContents.map(({ id, image, title, icon, value }) => (
                <Box
                    key={id}
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
                    <CardMedia component="img" image={image} sx={{ maxWidth: 100, width: "100%" }} />
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{ color: theme.palette.text.disabled, fontWeight: theme.fontWeight.semiBold }}
                        >
                            {value}
                            <Box component="img" src={icon} sx={{ mb: { xs: "24px", xss: "16px" } }} />
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
// ============ End card list dashboard ============