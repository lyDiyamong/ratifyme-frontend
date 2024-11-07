// React Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// MUI Import
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { Description, Error, Group, TaskAltOutlined, WorkspacePremium } from "@mui/icons-material";
import { Box } from "@mui/system";

// Custom Import
import DashboardContainer from "../../../components/styles/DashboardContainer";
import PageTitle from "../../../components/PageTitle";
import PageLoading from "../../../components/loading/PageLoading";
import AlertMessage from "../../../components/alert/AlertMessage";
import BadgeInfo from "./BadgeInfo";
import TableEarnerList from "./TableEarnerList";
import CertificateGenerator from "./CertificateGenerator";
import theme from "../../../assets/themes";

// Api import
import { useFetchOneBadgeQuery } from "../../../store/api/badgeManagement/badgeApi";
import { useFetchEarnerAchieByIdQuery } from "../../../store/api/earnerManagement/earnerApis";

const BadgeDetail = () => {
    // Fetch ID from the URL
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(!!state?.successMessage);

    const [selectedEmails, setSelectedEmails] = useState([]);
    // Fetch badge by ID
    const { roleId, issuerData, earnerData } = useSelector((state) => state.global);
    const { data: oneBadgeRes, refetch, isLoading, isError } = useFetchOneBadgeQuery(id);
    const oneBadge = oneBadgeRes?.data;
    if (isError) {
        navigate('/404')
    }
    // Tab state
    const [value, setValue] = useState(0);
    const achievementId = oneBadge?.Achievements.map((achievement) => achievement.id);

    // Achievement Id
    const achieveId = oneBadge?.Achievements?.find(({ badgeClassId }) => badgeClassId === oneBadge.id)?.id;

    const { data: earnerAchieResponse } = useFetchEarnerAchieByIdQuery({ achieveId, earnerId: earnerData?.id });
    const earnerAchieveData = earnerAchieResponse?.data;

    let role = roleId;
    let subtitle;
    let activeUserId;
    let renderedTab;

    switch (role) {
        case 1: {
            role = "admin";
            break;
        }
        case 2: {
            role = "institution";
            subtitle = "Shaping learners, inspiring progress.";
            break;
        }
        case 3: {
            role = "issuer";
            activeUserId = issuerData.id;
            subtitle = "Recognizing skills, empowering futures.";
            renderedTab = <TableEarnerList emails={selectedEmails} achievementId={achievementId} />;
            break;
        }
        case 4: {
            role = "earner";
            activeUserId = earnerData.id;
            subtitle = "A mark of achievement, a step forward.";
            renderedTab = <CertificateGenerator badge={oneBadge} />;
            break;
        }
    }

    // Handler to get emails from IssuerBadgeButton
    const handleGetEmails = (emails) => {
        setSelectedEmails(emails);
    };
    // Tab handling
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to handle navigation
    const handleNavigate = () => {
        window.open(earnerAchieveData?.credUrl, "_blank");
    };

    // Re-fetch badge data when the component mounts or after editing
    useEffect(() => {
        if (state?.successMessage) {
            refetch(); // Refetch data if there's a success message (indicating an update)
        }
    }, [state?.successMessage, refetch]);

    // Set up a timer to automatically hide the alert after 3 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
            {isLoading ? (
                <PageLoading isLoading={isLoading} />
            ) : (
                <>
                    {showAlert && <AlertMessage variant="success">{state.successMessage}</AlertMessage>}
                    <PageTitle title="Badge Details" subtitle={subtitle} />

                    {/* Conditional rendering based on Status */}
                    <Stack gap={2} sx={{ display: role === "earner" ? "block" : "none" }}>
                        {earnerAchieveData?.status ? (
                            <Stack
                                flexDirection="row"
                                sx={{
                                    borderRadius: "8px",
                                    minHeight: 80,
                                    alignItems: "center",
                                    gap: 2,
                                    p: 1,
                                    textDecoration: "none",
                                    backgroundColor: theme.palette.action.hover,
                                    justifyContent: "space-between",
                                    border: "1px solid #91CAFF",
                                }}
                            >
                                <Stack flexDirection="row" gap={2} alignItems="center">
                                    <Box
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderTopLeftRadius: "8px",
                                            borderBottomLeftRadius: "8px",
                                        }}
                                    >
                                        <TaskAltOutlined
                                            sx={{ m: 1, width: 30, height: 30, color: theme.palette.primary.main }}
                                        />
                                    </Box>
                                    <Stack>
                                        <Typography
                                            variant="body1"
                                            fontWeight={theme.fontWeight.bold}
                                            color={theme.palette.text.primary}
                                        >
                                            Public Credential
                                        </Typography>
                                        <Typography variant="body2">
                                            Showcase your skills and achievement with Public Credential.{" "}
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                onClick={handleNavigate}
                                                fontWeight="bold"
                                                sx={{
                                                    cursor: "pointer",
                                                    color: theme.palette.primary.main,
                                                    "&:hover": {
                                                        color: theme.palette.primary.dark,
                                                    },
                                                    textWrap: "nowrap",
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                Click here!
                                            </Typography>
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack
                                flexDirection="row"
                                sx={{
                                    borderRadius: "8px",
                                    minHeight: 80,
                                    alignItems: "center",
                                    gap: 2,
                                    p: 1,
                                    textDecoration: "none",
                                    backgroundColor: "#FFF6E9",
                                    border: "1px solid #FFD09B",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderTopLeftRadius: "8px",
                                        borderBottomLeftRadius: "8px",
                                    }}
                                >
                                    <Error sx={{ m: 1, width: 30, height: 30, color: theme.palette.customColors.orange400 }} />
                                </Box>
                                <Stack>
                                    <Typography
                                        variant="body1"
                                        fontWeight={theme.fontWeight.bold}
                                        color={theme.palette.text.primary}
                                    >
                                        Public Credential
                                    </Typography>
                                    <Typography variant="body2">Claim your badge to get the Public Credential.</Typography>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab
                            label="Description"
                            icon={<Description />}
                            iconPosition="start"
                            sx={{ textTransform: "none", fontSize: "16px" }}
                        />
                        {role === "issuer" && (
                            <Tab
                                label="Earner List"
                                icon={<Group />}
                                iconPosition="start"
                                sx={{ textTransform: "none", fontSize: "16px" }}
                            />
                        )}
                        {role === "earner" && (
                            <Tab
                                label="Your Certificate"
                                icon={<WorkspacePremium />}
                                iconPosition="start"
                                sx={{ textTransform: "none", fontSize: "16px" }}
                            />
                        )}
                    </Tabs>
                    {value === 0 && (
                        <BadgeInfo
                            badge={oneBadge}
                            userRole={role}
                            activeUserId={activeUserId}
                            onGetEmails={handleGetEmails}
                            emails={selectedEmails}
                        />
                    )}
                    {value === 1 && renderedTab}
                </>
            )}
        </DashboardContainer>
    );
};

export default BadgeDetail;
