import { Button } from "@mui/material";
import theme from "../assets/themes";

// Custom Import
import { useFetchEarnerAchieByIdQuery } from "../store/api/earnerManagement/earnerApis";
import { useClaimBadgeMutation } from "../store/api/badgeManagement/badgeApi";
import { useEffect, useState } from "react";
import AlertConfirmation from "./alert/AlertConfirmation";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import useCatchStatus from "../hooks/useCatchStatus";
import AlertMessage from "./alert/AlertMessage";

// =========== Start ClaimBadgeButton ===========
const ClaimBadgeButton = ({ earnerId, badgeClassId, achievementIds }) => {
    // Fetch the earner's achievement status from the API
    const { data: earnerAchieResponse, refetch } = useFetchEarnerAchieByIdQuery({ achieveId: achievementIds, earnerId });
    const [claimBadge, { isLoading, isSuccess }] = useClaimBadgeMutation();

    // Extract the achievement status from the response
    const statusAchievement = earnerAchieResponse?.data?.status;
    const issuedOn = earnerAchieResponse?.data?.issuedOn;

    // Set initial state of claimed based on statusAchievement
    const [claimed, setClaimed] = useState(false);

    const [message, setMessage] = useCatchStatus(isSuccess, isSuccess ? "Badge Claimed successfully" : "Badge Claimed failed");

    // Confirm modal State
    const [isClaimBadgeModal, setIsClaimBadgeModal] = useState(false);
    // Function to handle claiming the badge
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
            console.error("Failed to claim badge:", error);
            setMessage("Badge Claimed failed")
        } finally {
            // Close modal regardless of success or error
            setIsClaimBadgeModal(false);
        }
    };

    // Update claimed state when statusAchievement changes or issuedOn is null
    useEffect(() => {
        if (issuedOn === null) {
            setClaimed(true); // Mark as claimed if the issuedOn field is null
        } else if (statusAchievement !== undefined) {
            setClaimed(statusAchievement); // Update claimed state based on statusAchievement
        }
    }, [statusAchievement, issuedOn]); // Only run this effect when statusAchievement or issuedOn changes

    return (
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
                disabled={claimed || isLoading}
                sx={{
                    backgroundColor: claimed ? theme.palette.customColors.gray200 : theme.palette.primary.main,
                    color: claimed ? theme.palette.text.disabled : theme.palette.customColors.white,
                    fontSize: theme.typography.body1,
                    fontWeight: theme.fontWeight.bold,
                    borderRadius: theme.customShape.btn,
                    minWidth: 150,
                    "&:disabled": {
                        backgroundColor: theme.palette.customColors.gray200,
                        color: theme.palette.text.disabled,
                    },
                }}
            >
                {isLoading ? "Claiming..." : issuedOn === null || !claimed ? "Claim Badge" : "Claimed"}
            </Button>
        </>
    );
};

export default ClaimBadgeButton;
