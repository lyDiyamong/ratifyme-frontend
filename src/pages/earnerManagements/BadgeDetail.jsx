import React from "react";

import {Box, Typography, Stack } from "@mui/material"

import theme from "../../assets/themes";
import PageSection from "./PageSection";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { TitleData, DetailData } from "./DataBadgeDetialed";



const BadgeDetail = () => {
    return (
        <DashboardContainer>
            <PageSection>
                <Stack flexDirection={{ xs: "column", md: "row" }}>
                    <Box sx={{m:2}}>
                        {TitleData.items.map((item) => (
                            <Typography
                                key={item.id}
                                variant="body1"
                                sx={{textAlign: "right", }}>
                                {item.id}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{m:2}}>
                        {DetailData.items.map((item) => (
                            <Typography
                                key={item.id}
                                variant="body1"
                                sx={{textAlign: "right", }}>
                                {item.id}
                            </Typography>
                        ))}
                    </Box>
                </Stack>
            </PageSection>
        </DashboardContainer>
    )
}

export default BadgeDetail