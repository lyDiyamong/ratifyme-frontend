// MUI Import
import { Button } from "@mui/material";
import theme from "../../assets/themes";

// Custom Import
import { useIssueOnBadgeMutation } from "../../store/api/achievements/achievementApi";

const IssueToEarnerButton = ({ achievementId }) => {
    const [issueOnBadge, { isLoading }] = useIssueOnBadgeMutation();
    console.log(achievementId);
    const handleIssueBadge = async () => {
        try {
            // Here, pass the correct parameters expected by the mutation
            const result = { achievementId: achievementId };
            await issueOnBadge(result).unwrap();
            console.log("Badge successfully issued!");
            console.log(result);
        } catch (error) {
            console.log(result);
            console.error("Error issuing badge:", error);
        }
    };

    return (
        <Button
            onClick={handleIssueBadge}
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
