import { Button } from "@mui/material";
import theme from "../assets/themes";
import { useClaimBadgeMutation } from "../store/api/earnerManagement/earnerApis";
import { useEffect, useState } from "react";

const ClaimBadgeButton = ({ earnerId, badgeClassId, status }) => {
    const [claimBadge, { isLoading }, refetch] = useClaimBadgeMutation();
    const [claimed, setClaimed] = useState(status); // Initialize based on incoming status

    useEffect(() => {
        setClaimed(status); // Update claimed state if status prop changes
    }, [status]);

    const handleClaimBadge = async () => {
        try {
            const response = await claimBadge({ earnerId, badgeClassId, status: true }).unwrap();
            setClaimed(true); // Update state to reflect the badge has been claimed
            console.log("Badge claimed successfully:", response);
            refetch();
            // Handle success (e.g., show a notification or update the UI)
        } catch (error) {
            console.error("Failed to claim badge:", error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Button
            onClick={handleClaimBadge}
            disabled={claimed}
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.customColors.white,
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
            {claimed ? "Claimed" : "Claim Badge"}
        </Button>
    );
};

export default ClaimBadgeButton;
