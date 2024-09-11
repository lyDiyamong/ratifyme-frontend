import React from "react";
import { Typography, Grid } from "@mui/material";
import PageSection from "./PageSection";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { TitleData, DetailData } from "./DataBadgeDetailed";

const BadgeDetail = () => {
    return (
        <DashboardContainer>
            <PageSection>
                <Grid container spacing={3}>
                    {TitleData.items.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Grid item xs={5} md={2}>
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "right" }}
                                >
                                    {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={7} md={9}>
                                {DetailData.items[index]?.ReactCode ? (
                                    DetailData.items[index].ReactCode
                                ) : (
                                    <Typography
                                        variant="body1"
                                        sx={DetailData.items[index].sx}
                                    >
                                        {DetailData.items[index]?.Detail}
                                    </Typography>
                                )}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </PageSection>
        </DashboardContainer>
    );
};

export default BadgeDetail;
