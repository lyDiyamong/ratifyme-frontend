import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import OrgProfileInfo from "./OrgProfileInfo";
import OrgProfileHeader from "./OrgProfileHeader";
import OrganizationBio from "./OrganizationBio";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import { useGetIssuersQuery } from "../../../store/api/issuerManagement/issuerApi";

const OrganizationInfo = () => {
    const { id } = useParams(); // Get the organization ID from the URL
    const { data: issuers, isLoading: isLoadingIssuer } = useGetIssuersQuery();

    // Find the specific organization by ID from the fetched issuers
    const organization = issuers?.data?.find((issuer) => issuer.Institution.id === parseInt(id));
    console.log("specific data of insti", organization);

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Stack gap={3}>
                <Grid container spacing={3}>
                    {/* Profile Header and Bio Content */}
                    <Grid item xss={12} md={4}>
                        <Stack spacing={2} direction="column">
                            <OrgProfileHeader institutionInfo={organization} />
                            <OrganizationBio institutionInfo={organization} />
                        </Stack>
                    </Grid>

                    {/* Profile Info */}
                    <Grid item xss={12} md={8}>
                        <OrgProfileInfo institutionInfo={organization} />
                    </Grid>
                </Grid>
            </Stack>
        </DashboardContainer>
    );
};

export default OrganizationInfo;
