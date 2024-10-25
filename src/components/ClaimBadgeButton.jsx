// React import
import { useEffect, useState } from "react";

// MUI import
import { Button } from "@mui/material";

// Custom import
import AlertConfirmation from "./alert/AlertConfirmation";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import useCatchStatus from "../hooks/useCatchStatus";
import AlertMessage from "./alert/AlertMessage";
import theme from "../assets/themes";

// Api import
import { useClaimBadgeMutation } from "../store/api/badgeManagement/badgeApi";
import { useFetchEarnerAchieByIdQuery } from "../store/api/earnerManagement/earnerApis";

const ClaimBadgeButton = ({ earnerId, badgeClassId, achievementIds }) => {
    // =========== API Hooks & Data Fetching ===========
    const { data: earnerAchieResponse, refetch } = useFetchEarnerAchieByIdQuery({ achieveId: achievementIds, earnerId });
    const [claimBadge, { isSuccess }] = useClaimBadgeMutation();
    console.log("Achievement Id", achievementIds);
    console.log("Earner Id", earnerId);

    // =========== State Management ===========
    const [claimed, setClaimed] = useState(false);
    const [isClaimBadgeModal, setIsClaimBadgeModal] = useState(false);
    const [message, setMessage] = useCatchStatus(isSuccess, isSuccess ? "Badge Claimed successfully" : "Badge Claimed failed");

    // Extract response data
    const statusAchievement = earnerAchieResponse?.data?.status;
    const issuedOn = earnerAchieResponse?.data?.issuedOn;

    // =========== Badge Claim Handler ===========
    /**
     * Handles the badge claiming process
     * Makes API call to claim badge and updates local state
     */
    const handleClaimBadge = async () => {
        try {
            await claimBadge({
                earnerId,
                achievementIds,
                badgeClassId,
                status: true,
            }).unwrap();
            setClaimed(true);
            refetch();
        } catch (error) {
            setMessage("Badge Claimed failed");
        } finally {
            setIsClaimBadgeModal(false);
        }
    };
    console.log("Claim status", claimed);

    // =========== Side Effects ===========
    /**
     * Updates claimed state based on API response
     * Marks as claimed if issuedOn is null or based on statusAchievement
     */
    console.log("Issued On", issuedOn);
    useEffect(() => {
        if (statusAchievement !== undefined) {
            setClaimed(statusAchievement);
            console.log("Status", statusAchievement);
        }
    }, [statusAchievement, issuedOn]);

    return (
        // =========== Start ClaimBadgeButton ===========
        <>
            {message && <AlertMessage variant={isSuccess ? "success" : "error"}>{message}</AlertMessage>}
            <AlertConfirmation
                open={isClaimBadgeModal}
                title="Claim your Badge"
                message="Are you sure you want to accept this badge? Preview the badge details before accepting it. If everything looks good, please click the 'Accept' button!"
                onClose={() => setIsClaimBadgeModal(false)}
                onConfirm={handleClaimBadge}
                confirmText="Accept"
                cancelText="Cancel"
                iconBgColor={theme.palette.background.success}
                iconColor={theme.palette.customColors.green300}
                confirmButtonColor={theme.palette.customColors.green300}
                confirmButtonColorHover={theme.palette.customColors.green400}
                icon={VerifiedRoundedIcon}
            />
            <Button
                onClick={() => setIsClaimBadgeModal(true)}
                disabled={issuedOn === null|| claimed}
                variant="contained"
                sx={{
                    color: theme.palette.customColors.white,
                    fontSize: theme.typography.body1,
                    fontWeight: theme.fontWeight.bold,
                    borderRadius: theme.customShape.btn,
                    px: 3,
                    textTransform: "none",
                }}
            >
                {claimed ? "Claimed" :  "Claim Badge" }
            </Button>
        </>
        // =========== End ClaimBadgeButton ===========
    );
};

export default ClaimBadgeButton;
