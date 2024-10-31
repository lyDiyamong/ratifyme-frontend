import { Box } from "@mui/system";
import LandingContainer from "../../../components/styles/LandingContainer";
import ImageSwitcher from "./ImageSwitcher";
import CredentialContent from "./CredentialContent";
import {
    useFetchEarnerAchieveByUidQuery,
    useFetchEarnerByIdQuery,
    useFetchAchieveByidQuery,
} from "../../../store/api/earnerManagement/earnerApis";
import { useNavigate, useParams } from "react-router";
import { useVerifyCredMutation } from "../../../store/api/earnerManagement/verificationApi";
import { useState } from "react";
import VerificationModal from "../../../components/VerificationModals";
import VerificationFailureModal from "../../../components/VerificationFailModal";
import { Skeleton, Stack } from "@mui/material";

const Credential = () => {
    const { credId } = useParams();
    const navigate = useNavigate();
    // For success modal
    const [open, setOpen] = useState(false);
    // For failure modal
    const [failOpen, setFailOpen] = useState(false);

    // EarnerAchieve hook
    const {
        data: earnerAchieRes,
        isLoading: earnerAchieveLoading,
        error: earnerAchieveError,
    } = useFetchEarnerAchieveByUidQuery({ credId });
    const earnerAchieData = earnerAchieRes?.data;

    // Earner Hook
    const { data: earnerRes, isLoading: earnerLoading } = useFetchEarnerByIdQuery(earnerAchieData?.earnerId);
    const earnerData = earnerRes?.data;

    // Achievement Hook
    const { data: achieveRes, isLoading: achieveLoading } = useFetchAchieveByidQuery({
        achievementId: earnerAchieRes?.data?.achievementId,
    });

    // Verify Credentials Mutation
    const [verifyCred, { isLoading: verifyLoading }] = useVerifyCredMutation();

    // If no data or there’s an error, redirect to 404
    if (!earnerAchieData && !earnerAchieveLoading) {
        return navigate("/404");
    }

    const achieveData = achieveRes?.data;

    // Loading state
    const isLoading = earnerAchieveLoading || earnerLoading || achieveLoading || verifyLoading;

    //handle Close modals
    const handleClose = () => {
        setOpen(false);
    };

    const handleFailClose = () => {
        setFailOpen(false);
    };

    //handle Verify credentials
    const handleVerify = async () => {
        try {
            // Open the verification modal
            setOpen(true);

            // Make the API call and unwrap the response
            await verifyCred({
                credId,
                verifyData: {
                    earnerName: earnerData?.name,
                    issuerName: `${achieveData?.BadgeClass?.Issuer?.User?.firstName} ${achieveData?.BadgeClass?.Issuer?.User?.lastName}`,
                    issuedOn: earnerAchieData?.issuedOn,
                    claimedOn: earnerAchieData?.claimedOn,
                },
            }).unwrap();

        } catch (error) {
            console.error("Verification failed", error);
            setOpen(false);
            setFailOpen(true);
        }
    };

    return (
        <Box>
            {/* Success Modal */}
            <VerificationModal
                open={open}
                handleClose={handleClose}
                achieveData={achieveData}
                earnerData={earnerData}
                credId={credId}
                earnerAchieData={earnerAchieData}
            />

            {/* Failure Modal */}
            <VerificationFailureModal open={failOpen} handleClose={handleFailClose} message="Verification failed" />

            {/* Image and Content */}
            <ImageSwitcher images={[earnerAchieData?.certUrlJpeg, achieveData?.BadgeClass?.imageUrl]} credId={credId} />

            {isLoading ? (
                // Display loading component when fetching data
                <Stack gap={2} px={2} flexDirection={{ sm: "row", xss: "column" }} justifyContent="center">
                    <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: "8px", maxWidth: 250 }} />
                    <Skeleton variant="rectangular" width="100%" height={616} sx={{ borderRadius: "8px", maxWidth: 700 }} />
                </Stack>
            ) : (
                <LandingContainer>
                    <CredentialContent
                        earnerData={earnerData}
                        achieveData={achieveData}
                        credUrl={earnerAchieData?.credUrl}
                        credId={credId}
                        verifyCred={handleVerify}
                    />
                </LandingContainer>
            )}
        </Box>
    );
};

export default Credential;
