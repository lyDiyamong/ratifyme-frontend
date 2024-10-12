// MUI Import
import { Button } from "@mui/material";
import theme from "../../assets/themes";

// Custom Import
import { useSendBadgeMutation } from "../../store/api/achievements/achievementApi";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";

const IssueToEarnerButton = ({ emails, badgeId }) => {
    const [sendBadge, { isLoading }] = useSendBadgeMutation();
    const { data: earner } = useFetchEarnerQuery();

    // Ensure earnerIds is always an array
    const earnerIds =
        earner?.data?.filter((earner) => emails.includes(earner.User.email))?.map((earner) => earner.id) || [];

    const handleSendBadge = async () => {
        if (earnerIds.length > 0) {
            try {
                // Here, pass the correct parameters expected by the mutation
                const result = { id: badgeId, earners: earnerIds }; // Use 'id' to match your API definition
                await sendBadge(result).unwrap(); // Use unwrap to catch the error properly
                console.log("Badge successfully issued!");
            } catch (error) {
                console.error("Error issuing badge:", error);
            }
        } else {
            console.error("No earners found for the provided emails.");
        }
    };

    return (
        <Button
            onClick={handleSendBadge}
            disabled={isLoading}
            variant="contained"
            sx={{
                fontSize: theme.typography.body1,
                borderRadius: theme.customShape.btn,
                px: 3,
                color: "white",
            }}
        >
            {isLoading ? "Issuing..." : "Send Issue"}
        </Button>
    );
};

export default IssueToEarnerButton;
