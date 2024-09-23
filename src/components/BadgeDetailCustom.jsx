// React Import
import { useState } from "react";

// MUI Import
import { Box, Grid, Typography, Button, Tabs, Tab, Chip, Stack } from "@mui/material";
import theme from "../assets/themes";
import goldBadge from "../assets/images/GoldBadge.svg";

// Custom Import
import IssuerBadgeButton from "./IssuerBadgeButton";
import IssueToEarnerButton from "./IssueToEarnerButton";
import ClaimBadgeButton from "./ClaimBadgeButton";

const BadgeDetailCustom = ({ badge, userRole }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const result = badge?.data;
    console.log(result);

    const createdAt = result?.createdAt ? result.createdAt.split("T")[0] : "N/A";
    const expiredDate = result?.expiredDate ? result.expiredDate.split("T")[0] : "N/A";

    const durationInMs = result?.duration || 0;
    const days = durationInMs / (1000 * 60 * 60 * 24);
    const hours = Math.floor((durationInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
    // Define role-based access for tab content
    const hasDescriptionAccess = ["admin", "issuer", "earner"].includes(userRole);
    const hasEarnerListAccess = ["admin", "issuer"].includes(userRole);

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
                                    <IssuerBadgeButton />
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
                    borderColor: theme.palette.divider,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.card,
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
                TabIndicatorProps={{ style: { display: "none" } }}
            >
                {hasDescriptionAccess && (
                    <Tab
                        label="Description"
                        sx={{
                            p: 0,
                            flexGrow: 1,
                            textAlign: "center",
                            height: "100%",
                            justifyContent: "center",
                            "&.Mui-selected": {
                                color: theme.palette.primary.main,
                            },
                        }}
                    />
                )}
                {hasEarnerListAccess && (
                    <Tab
                        label="Earner List"
                        sx={{
                            flexGrow: 1,
                            height: "100%",
                            display: "flex",
                            "&.Mui-selected": {
                                color: theme.palette.primary.main,
                            },
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
                    height: "35rem",
                }}
            >
                {hasDescriptionAccess && value === 0 && (
                    <Box>
                        {/* Badge Details */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textAlign: "right",
                                margin: 3,
                                gap: 1,
                            }}
                        >
                            {/* Left Column */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start", // Align items to the top of the column
                                    gap: 5,
                                    flex: 1,
                                    // maxWidth: 200,
                                }}
                            >
                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Description :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result.description || "No description available"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Issued By :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result.Issuer?.User?.username || "Unknown Issuer"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            marginRight: 10,
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Criteria :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result.Criterias?.length
                                            ? result.Criterias.map((item, index) => (
                                                  <Typography component="span" key={index}>
                                                      {item.narrative}
                                                  </Typography>
                                              ))
                                            : "No criteria provided"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Issued Date :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result.createdAt ? result.createdAt.split("T")[0] : "N/A"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Expiry Date :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {expiredDate || "No expiry date"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Duration :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {days ? `${days} days` : "No duration available"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                        }} // Increased font size
                                        color={theme.palette.text.primary}
                                    >
                                        Achievement Type :
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result.Achievements?.length
                                            ? result.Achievements?.map(
                                                  (achievement) => achievement.AchievementType?.name,
                                              ).join(", ")
                                            : "No achievement type available"}
                                    </Typography>
                                </Stack>

                                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: 640 }}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.h5,
                                            fontWeight: theme.fontWeight.bold,
                                            marginRight: 10,
                                        }}
                                        color={theme.palette.text.primary}
                                    >
                                        Tags:
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }} // Increased font size
                                        color={theme.palette.text.secondary}
                                    >
                                        {result?.tags
                                            ? result?.tags.split(",").map((tag, index) => (
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
                                            : "No tags"}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                )}

                {hasEarnerListAccess && value === 1 && (
                    <Box>
                        {/* Earner List Tab */}
                        <Typography sx={{ fontSize: theme.typography.body2 }} color={theme.palette.text.primary}>
                            Earner List
                        </Typography>
                        {/* Add your earner list code here */}
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
