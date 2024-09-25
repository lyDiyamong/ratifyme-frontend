// React Import
import { useState } from "react";
import { useForm } from "react-hook-form";

// MUI Import
import { Box, Grid, Typography, Button, Tabs, Tab, Chip, Stack, useMediaQuery } from "@mui/material";
import theme from "../assets/themes";
import goldBadge from "../assets/images/GoldBadge.svg";

// Custom Import
import IssuerBadgeButton from "../pages/badgeMangements/IssuerBadgeButton";
import IssueToEarnerButton from "../pages/badgeMangements/IssueToEarnerButton";
import ClaimBadgeButton from "./ClaimBadgeButton";

const BadgeDetailCustom = ({ badge, userRole }) => {
    // define breakpoint of the screen
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

    // function that will change the value when select tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    // assign variable from props that has fetch value
    const result = badge?.data;
    console.log(result);

    // assign variables for date
    const createdAt = result?.createdAt ? result.createdAt.split("T")[0] : "N/A";
    const expiredDate = result?.expiredDate ? result.expiredDate.split("T")[0] : "N/A";

    // convert duration from milli second into date
    const durationInMs = result?.duration || 0;
    const days = durationInMs / (1000 * 60 * 60 * 24);

    // Define role-based access for tab content
    const hasAccessEarner = ["issuer", "earner"].includes(userRole);
    const hasAccess = ["issuer"].includes(userRole);

    // State for handling selected emails
    const [selectedEmails, setSelectedEmails] = useState([]);

    // Handler to get emails from IssuerBadgeButton
    const handleGetEmails = (emails) => {
        setSelectedEmails(emails);
    };

    console.log(selectedEmails);
    // Define sub-component to use in tab content
    const DetailItem = ({ label, value, isSmallScreen }) => (
        <Stack sx={{ flexDirection: isSmallScreen ? "column" : "row", gap: 2 }}>
            <Typography
                sx={{
                    fontSize: theme.typography.h6,
                    fontWeight: theme.fontWeight.bold,
                    width: isSmallScreen ? "100%" : "180px",
                }}
                color={theme.palette.text.primary}
            >
                {label}:
            </Typography>
            <Typography
                sx={{ fontSize: theme.typography.body1, width: isSmallScreen ? "100%" : "500px" }}
                color={theme.palette.text.secondary}
            >
                {value}
            </Typography>
        </Stack>
    );

    return (
        // ============ Start Badge Detail ============
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            {/* Start Header */}
            <Box
                sx={{
                    padding: 3,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.card,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    height: {
                        xs: "auto",
                        sm: "15rem",
                        md: "20rem",
                    },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        {/* Badge/Logo Image */}
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            component="img"
                            src={goldBadge}
                        ></Box>
                    </Grid>
                    <Grid item xs={12} sm={8} container direction="column" spacing={2}>
                        {/* Badge Title & Issuer */}
                        <Grid item>
                            <Typography variant="h5" color={theme.palette.text.primary}>
                                {result.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: theme.typography.body2 }} color={theme.palette.text.secondary}>
                                Issued By {result.Issuer?.User?.username}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: theme.typography.body2 }} color={theme.palette.text.secondary}>
                                Date: {createdAt}
                            </Typography>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item>
                            {userRole === "issuer" ? (
                                <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
                                    <IssuerBadgeButton onGetEmail={handleGetEmails} control={control} />
                                    <IssueToEarnerButton />
                                </Box>
                            ) : (
                                <ClaimBadgeButton />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* End Header */}

            {/* Start Tabs */}
            <Tabs
                value={value}
                onChange={handleChange}
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                }}
                TabIndicatorProps={{ style: { display: "none" } }}
            >
                {hasAccess && (
                    <Tab
                        label="Description"
                        sx={{
                            width: "50%",
                            textAlign: "center",
                            color: theme.palette.text.disabled,
                            border: `2px solid ${theme.palette.customColors.gray200}`,
                            "&.Mui-selected": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.customColors.white,
                                border: 0,
                            },
                            borderRadius: theme.customShape.card,
                            fontSize: theme.typography.h5,
                            fontWeight: theme.fontWeight.bold,
                        }}
                    />
                )}
                {hasAccess && (
                    <Tab
                        label="Earner List"
                        sx={{
                            width: "50%",
                            textAlign: "center",
                            color: theme.palette.text.disabled,
                            border: `2px solid ${theme.palette.customColors.gray200}`,
                            "&.Mui-selected": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.customColors.white,
                                border: 0,
                            },
                            borderRadius: theme.customShape.card,
                            fontSize: theme.typography.h5,
                            fontWeight: theme.fontWeight.bold,
                        }}
                    />
                )}
            </Tabs>

            {/* End Tabs */}

            {/* Start Tab Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.card,
                    height: "auto",
                    overflow: "hidden",
                    maxWidth: "100%",
                }}
            >
                {hasAccessEarner && value === 0 && (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: isSmallScreen ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                margin: isSmallScreen ? 1 : 3,
                                gap: isSmallScreen ? 2 : 1,
                                flexWrap: "wrap",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    flex: 1,
                                    width: "100%",
                                }}
                            >
                                <DetailItem
                                    label="Description"
                                    value={result.description || "No description available"}
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Issuer"
                                    value={result.Issuer?.User?.username || "Unknown Issuer"}
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Criteria"
                                    value={
                                        result.Criterias?.length
                                            ? result.Criterias.map((item, index) => (
                                                  <Typography component="span" key={index}>
                                                      {item.narrative}
                                                  </Typography>
                                              ))
                                            : "No criteria provided"
                                    }
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Issued Date"
                                    value={result.createdAt ? result.createdAt.split("T")[0] : "N/A"}
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Badge’s Expiry Date"
                                    value={expiredDate || "No expiry date"}
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Duration"
                                    value={days ? `${days} days` : "No duration available"}
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Achievement Type"
                                    value={
                                        result.Achievements?.length
                                            ? result.Achievements.map(
                                                  (achievement) => achievement.AchievementType?.name,
                                              ).join(", ")
                                            : "No achievement type available"
                                    }
                                    isSmallScreen={isSmallScreen}
                                />
                                <DetailItem
                                    label="Tags"
                                    value={
                                        result?.tags
                                            ? result.tags.split(",").map((tag, index) => (
                                                  <Chip
                                                      key={index}
                                                      label={tag}
                                                      sx={{
                                                          marginRight: 1,
                                                          backgroundColor: theme.palette.primary.main,
                                                          color: theme.palette.customColors.white,
                                                      }}
                                                  />
                                              ))
                                            : "No tags"
                                    }
                                    isSmallScreen={isSmallScreen}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}

                {hasAccess && value === 1 && (
                    <Box>
                        {selectedEmails.map((item, index) => (
                            <Box key={index} sx={{ py: 1 }}>
                                {item}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            {/* End Tab Content */}

            {/* Start Footer (Delete Badge Button) */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" sx={{ borderRadius: theme.customShape.btn, marginBottom: 2 }}>
                    Delete Badge
                </Button>
            </Box>
            {/* End Footer (Delete Badge Button)*/}
        </Box>
        // ============ End Badge Detail ============
    );
};

export default BadgeDetailCustom;
