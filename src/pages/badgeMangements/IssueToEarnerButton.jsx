// React import
import { useState } from "react";
// MUI Import
import { Button } from "@mui/material";
import theme from "../../assets/themes";

// Custom Import
import { useIssueOnBadgeMutation } from "../../store/api/achievements/achievementApi";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";

const IssueToEarnerButton = ({ achievementId }) => {
    const [issueOnBadge, { isLoading, isSuccess, isError }] = useIssueOnBadgeMutation();
    const [isUploadCertModal, setIsUploadCertModal] = useState(false);

    const [message, setMessage] = useCatchStatus(
        isSuccess || isError,
        isSuccess ? "Issue badge successfully" : "Issue badge failed",
    );

    const handleIssueBadge = async () => {
        try {
            await issueOnBadge({ achievementId }).unwrap();
        } catch (error) {
            setMessage("Issue badge failed also failed");
        } finally {
            setIsUploadCertModal(false);
        }
    };

    return (
        <>
            {message && (
                <AlertMessage variant={isSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <AlertConfirmation
                open={isUploadCertModal}
                title="Issue to Earner"
                message="Are you sure you want to issue this badge to the recipients? Preview the badge details before issuing it. If you're done, please click the 'Issue' button!"
                onClose={() => setIsUploadCertModal(false)}
                onConfirm={handleIssueBadge}
                confirmText="Issue"
                cancelText="Cancel"
                iconBgColor={theme.palette.primary.light}
                iconColor={theme.palette.primary.main}
                confirmButtonColor={theme.palette.primary.main}
                confirmButtonColorHover={theme.palette.primary.dark}
                icon={ForwardToInboxIcon}
            />
            <Button
                onClick={() => setIsUploadCertModal(true)}
                disabled={isLoading}
                variant="outlined"
                sx={{
                    fontSize: theme.typography.body1,
                    borderRadius: theme.customShape.btn,
                    px: 3,
                    textTransform: "none",
                }}
            >
                Issue Badge
            </Button>
        </>
    );
};

export default IssueToEarnerButton;
