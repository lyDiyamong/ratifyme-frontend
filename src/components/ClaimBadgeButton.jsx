import { Button } from "@mui/material";
import theme from "../assets/themes";

// Custom Import
import { useFetchEarnerAchieByIdQuery } from "../store/api/earnerManagement/earnerApis";
import { useClaimBadgeMutation } from "../store/api/badgeManagement/badgeApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// =========== Start ClaimBadgeButton ===========
const ClaimBadgeButton = ({ earnerId, badgeClassId, achievementIds }) => {
    const { data: earnerAchieResponse } = useFetchEarnerAchieByIdQuery({ achieveId: achievementIds, earnerId });
    const [claimBadge, { isLoading }] = useClaimBadgeMutation();

    const statusAchievement = earnerAchieResponse?.data?.status;
    const navigate = useNavigate();

    // const statusAchievement = earnerBadge?.data?.status;
    const [claimed, setClaimed] = useState(statusAchievement);

    // Update claimed state when statusAchievement changes
    useEffect(() => {
        if (statusAchievement !== undefined) {
            setClaimed(statusAchievement);
        }
    }, [statusAchievement]);

    const handleClaimBadge = async () => {
        try {
            await claimBadge({
                earnerId,
                achievementIds,
                badgeClassId,
                status: true,
            }).unwrap();

            navigate("/mybackpacks");
        } catch (error) {
            console.error("Failed to claim badge:", error);
        }
    };

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
