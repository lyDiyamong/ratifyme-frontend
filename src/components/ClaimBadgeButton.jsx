// MUI Import
import { Button } from "@mui/material";
import theme from "../assets/themes";

// Custom Import
import { useClaimBadgeMutation, useFetchStatusBadgeQuery } from "../store/api/earnerManagement/earnerApis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// =========== Start ClaimBadgeButton ===========
const ClaimBadgeButton = ({ earnerId, badgeClassId, achievementIds }) => {
    const { data: earnerBadge } = useFetchStatusBadgeQuery({ id: earnerId });
    const [claimBadge, { isLoading }] = useClaimBadgeMutation();

    const statusAchievement = earnerBadge?.data[0]?.status;
    const navigate = useNavigate();
    const [claimed, setClaimed] = useState(statusAchievement);

    useEffect(() => {
        setClaimed(statusAchievement);
    }, [statusAchievement]);

    const handleClaimBadge = async () => {
        try {
            setClaimed(statusAchievement);
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
        // Start Claim Button
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
        // End Claim Button
    );
};

export default ClaimBadgeButton;
// =========== End ClaimBadgeButton ===========