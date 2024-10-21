import { Button } from "@mui/material";
import theme from "../assets/themes";

// Custom Import
import { useFetchEarnerAchieByIdQuery } from "../store/api/earnerManagement/earnerApis";
import { useClaimBadgeMutation } from "../store/api/badgeManagement/badgeApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// =========== Start ClaimBadgeButton ===========
const ClaimBadgeButton = ({ earnerId, badgeClassId, achievementIds }) => {
    // Fetch the earner's achievement status from the API
    const { data: earnerAchieResponse, refetch } = useFetchEarnerAchieByIdQuery({ achieveId: achievementIds, earnerId });
    const [claimBadge, { isLoading }] = useClaimBadgeMutation();
    const navigate = useNavigate();

    // Extract the achievement status from the response
    const statusAchievement = earnerAchieResponse?.data?.status;

    // Set initial state of claimed based on statusAchievement
    const [claimed, setClaimed] = useState(statusAchievement || false);

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
            navigate("/mybackpacks");
        } catch (error) {
            console.error("Failed to claim badge:", error);
        }
    };

    // Update claimed state when statusAchievement changes
    useEffect(() => {
        if (statusAchievement !== undefined && statusAchievement !== claimed) {
            setClaimed(statusAchievement);
        }
    }, [statusAchievement, claimed]);

    // Log the claimed state for debugging purposes
    console.log("Claimed state:", claimed);

    return (
        <Button
            onClick={handleClaimBadge}
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
            {isLoading ? "Claiming..." : claimed ? "Claimed" : "Claim Badge"}
        </Button>
    );
};

export default ClaimBadgeButton;
