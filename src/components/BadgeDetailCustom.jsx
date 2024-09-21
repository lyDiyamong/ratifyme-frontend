// React Import
import { useState } from "react";

// MUI Import
import { Box, Grid, Typography, Button, Tabs, Tab, Chip } from "@mui/material";
import theme from "../assets/themes";
import goldBadge from "../assets/images/GoldBadge.svg";

const BadgeDetailCustom = ({ badge, showAddEarnerButton, showIssueButton, showDeleteButton, userRole }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    <Grid item xs={12} sm={8}>
                        {/* Badge Title & Issuer */}
                        <Typography variant="h5" color={theme.palette.text.primary}>
                            {badge.title}
                        </Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary}>
                            Issued By {badge.issuer}
                        </Typography>
                        <Typography variant="body2" color={theme.palette.text.secondary}>
                            Date: {badge.issuedDate}
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ marginTop: 2 }}>
                            {showAddEarnerButton && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginRight: 2,
                                        borderRadius: theme.customShape.btn,
                                    }}
                                >
                                    Add earner to badge
                                </Button>
                            )}
                            {showIssueButton && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        marginRight: 2,
                                        borderRadius: theme.customShape.btn,
                                    }}
                                >
                                    Issue to Earner
                                </Button>
                            )}
                        </Box>
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
                        {/* Description Tab */}
                        <Typography variant="h6" color={theme.palette.text.primary}>
                            Description
                        </Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            {badge.description}
                        </Typography>

                        {/* Badge Details */}
                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Issuer: {badge.issuer}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Criteria: {badge.criteria}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Issued Date: {badge.issuedDate}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Expiry Date: {badge.expiryDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Duration: {badge.duration}
                                </Typography>
                                <Typography variant="body2" color={theme.palette.text.secondary}>
                                    Achievement Type: {badge.achievementType}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Tags */}
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>
                                Tags:
                            </Typography>
                            {badge.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    sx={{
                                        marginRight: 1,
                                        marginTop: 1,
                                        backgroundColor: theme.palette.customColors.gray100,
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Attributes */}
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>
                                Attributes:
                            </Typography>
                            {badge.attributes.map((attribute, index) => (
                                <Chip
                                    key={index}
                                    label={`${attribute.name}: ${attribute.value}`} // Corrected this line
                                    sx={{
                                        marginRight: 1,
                                        marginTop: 1,
                                        backgroundColor: theme.palette.customColors.gray200,
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {hasEarnerListAccess && value === 1 && (
                    <Box>
                        {/* Earner List Tab */}
                        <Typography variant="h6" color={theme.palette.text.primary}>
                            Earner List
                        </Typography>
                        {/* Add your earner list code here */}
                    </Box>
                )}
            </Box>
            {/* End Tab Content */}

            {/* Start Footer (Delete Badge Button) */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {showDeleteButton && (
                    <Button variant="contained" color="error" sx={{ borderRadius: theme.customShape.btn }}>
                        Delete Badge
                    </Button>
                )}
            </Box>
            {/* End Footer (Delete Badge Button)*/}
        </Box>
        // ============ End Badge Detail ============
    );
};

export default BadgeDetailCustom;
