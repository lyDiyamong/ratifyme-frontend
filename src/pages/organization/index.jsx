// React import
import { useSelector } from "react-redux";

// MUI import
import { Stack, Typography, Box, CardMedia } from "@mui/material";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import InstitutionProfileCard from "./InstitutionProfileCard";
import theme from "../../assets/themes";
import StatusCode from "../../assets/images/Search-Illustation.svg";

// Api import
import { useGetIssuersQuery } from "../../store/api/issuerManagement/issuerApi";

const Organization = () => {
    const { userId } = useSelector((state) => state.global);
    const { data: issuers, isLoading: isLoadingIssuer } = useGetIssuersQuery();

    // Filter the issuers data based on the current user ID
    const issuerDataInsti = issuers?.data?.filter((issuer) => issuer?.userId === userId) || [];

    const bgImage = [
        "https://www.gstatic.com/classroom/themes/img_code.jpg",
        "https://www.gstatic.com/classroom/themes/img_reachout.jpg",
        "https://www.gstatic.com/classroom/themes/img_breakfast.jpg",
        "https://www.gstatic.com/classroom/themes/img_bookclub.jpg",
        "https://www.gstatic.com/classroom/themes/img_read.jpg",
    ];

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <PageTitle
                title="Organization"
                subtitle="Organization All of your Organizations that you're working on."
            />

            <Stack
                sx={{
                    backgroundColor: "#fff",
                    p: 3,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    gap: 3,
                }}
            >
                <Typography variant="h6">Total Organization: {issuerDataInsti.length}</Typography>

                {issuerDataInsti.length !== 0 ? (
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            gap: 4,
                            "& > *": {
                                flexBasis: "calc(25% - 24px)",
                                "@media (max-width: 1450px)": {
                                    flexBasis: "calc(33.33% - 24px)",
                                },
                                "@media (max-width: 900px)": {
                                    flexBasis: "calc(50% - 24px)",
                                },
                                "@media (max-width: 600px)": {
                                    flexBasis: "100%",
                                },
                            },
                        }}
                    >
                        {!isLoadingIssuer &&
                            issuerDataInsti.map((issuer, index) => {
                                // Randomly select a background color
                                const randomBgImage = bgImage[index % bgImage.length];

                                return (
                                    <InstitutionProfileCard
                                        key={index}
                                        cardImgLogo={issuer.Institution.institutionProfileImage}
                                        orgEmail={issuer.Institution.institutionEmail}
                                        orgName={issuer.Institution.institutionName}
                                        cardBgImage={randomBgImage}
                                        institutionId={issuer.Institution.id}
                                    />
                                );
                            })}
                    </Stack>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                        <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                            No Organization Has Invited
                        </Typography>
                        <CardMedia
                            component="img"
                            image={StatusCode}
                            alt="No badges found"
                            sx={{ maxWidth: 400, width: "100%" }}
                        />
                    </Box>
                )}
            </Stack>
        </DashboardContainer>
    );
};

export default Organization;
