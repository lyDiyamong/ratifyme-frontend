// React Library
import { useEffect, useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

//Custom Import
import { createCardContent } from "./OverviewCardFetch";
import theme from "../../assets/themes";

// Fetching Data
import { useFetchInstitutionStatsQuery } from "../../store/api/reports/institutionStatApis";
import { useSelector } from "react-redux";

// =========== Start Overview Card ===========
const CardsList = () => {
    const { data: response, isLoading, isError } = useFetchInstitutionStatsQuery();
    const { userId, roleId } = useSelector((state) => state.global);
    const [cardContents, setCardContents] = useState([]);

    useEffect(() => {
        if (response && roleId) {
            const cardData = createCardContent(roleId, response.data, userId);
            setCardContents(cardData);
        }
    }, [response, userId]);

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
            {cardContents.map(({ title, image, icon, value }, index) => (
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