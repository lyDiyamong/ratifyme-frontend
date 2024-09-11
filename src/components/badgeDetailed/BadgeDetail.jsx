// React library import
import React from "react";

// MUI Import
import {
            Typography,
            Grid
        }   from    "@mui/material";

// Custome Import
import PageSection from "./PageSection";
import DashboardContainer from "../styles/DashboardContainer";
import {
            TitleData,
            DetailData
        } from "../../data/badgeDetail/DataBadgeDetailed";
import theme from "../../assets/themes";

// <!-- ============ Start BadgeDetail component ============ -->
const BadgeDetail = () => {
    return (
        <DashboardContainer>
            <PageSection>

            {/*  Start container  */}
                <Grid container spacing={3}>
                    {TitleData.items.map((item, index) => (

                        //  Start Fragment to save loop  */
                        <React.Fragment key={item.id}>

                            {/*  Start Title Detail  */}
                            <Grid item xs={5} md={2}>
                                <Typography
                                    variant="body1"
                                    sx={{   textAlign: "right",
                                            fontWeight: theme.fontWeight.bold.h4,
                                        }}>
                                    {item.title}
                                </Typography>
                            </Grid>
                            {/*  Start Title Detail  */}

                            {/*  Start Detail  */}
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
                            {/* Start Detail */}

                        </React.Fragment>
                        //  Start Fragment to save loop  */
                    ))}

                </Grid>
                {/* <!-- ============ Start container ============ --> */}

            </PageSection>
        </DashboardContainer>
    );
};
// <!-- ============ End BadgeDetail component ============ -->

export default BadgeDetail;
