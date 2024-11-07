// React import
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI import
import { Grid, Stack } from "@mui/material";

// Custom import
import OrgProfileInfo from "./OrgProfileInfo";
import OrgProfileHeader from "./OrgProfileHeader";
import OrganizationBio from "./OrganizationBio";
import PageTitle from "../../../components/PageTitle";
import DashboardContainer from "../../../components/styles/DashboardContainer";

// Api import
import { useGetIssuersQuery } from "../../../store/api/issuerManagement/issuerApi";
import { useGetInstitutionByIdQuery } from "../../../store/api/institutionManagement/institutionApi";
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";

const OrganizationInfo = () => {
    const { userId } = useSelector((state) => state.global);
    const { institutionData } = useSelector((state) => state.global);
    const { id: orgId } = useParams(); // Get the organization ID from the URL
    const { data: issuers, isLoading: isLoadingIssuer } = useGetIssuersQuery();
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    // Find the specific organization by ID from the fetched issuers
    const organization = issuers?.data?.find((issuer) => issuer.Institution.id === parseInt(orgId))?.Institution;
    const { data: insitutionRes } = useGetInstitutionByIdQuery(institutionData?.id, { skip: !institutionData?.id });
    const instituteData = insitutionRes?.data;
    const userRole = info?.data?.Role?.name;

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4, p:0 }}>
            <Stack gap={3}>
                <PageTitle
                    title="Organization Details"
                    subtitle="This section provides a detailed overview to help you understand the organization"
                    sx={{ display: userRole === "issuer" ? "flex" : "none" }}
                />
                <Grid container spacing={3}>
                    {/* Profile Header and Bio Content */}
                    <Grid item xss={12} md={4}>
                        <Stack spacing={3} direction="column">
                            <OrgProfileHeader institutionInfo={instituteData || organization} />
                            <OrganizationBio institutionInfo={instituteData || organization} />
                        </Stack>
                    </Grid>

                    {/* Profile Info */}
                    <Grid item xss={12} md={8}>
                        <OrgProfileInfo institutionInfo={instituteData || organization} />
                    </Grid>
                </Grid>
            </Stack>
        </DashboardContainer>
    );
};

export default OrganizationInfo;
