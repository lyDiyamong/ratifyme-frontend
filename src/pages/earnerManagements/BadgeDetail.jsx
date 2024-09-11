import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageSection from "./PageSection";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { TitleData, DetailData } from "./DataBadgeDetialed";

const BadgeDetail = () => {
    return (
        <DashboardContainer>
            <PageSection>
                <Grid container spacing={2}>
                    {TitleData.items.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Grid item xs={4}>
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "right" }}
                                >
                                    {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "left" }}
                                >
                                    {DetailData.items[index]?.Detail}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </PageSection>
        </DashboardContainer>
    );
};

export default BadgeDetail;
