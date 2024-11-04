// React library import
import { useState } from "react";

// MUI import
import { Button } from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

// Custom import
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import AlertMessage from "../../components/alert/AlertMessage";
import PageLoading from "../../components/loading/PageLoading";
import useCatchStatus from "../../hooks/useCatchStatus";
import theme from "../../assets/themes";

// API import
import { useIssueOnBadgeMutation } from "../../store/api/achievements/achievementApi";

const IssueToEarnerButton = ({ achievementId }) => {
    const [issueOnBadge, { isLoading, isSuccess, isError }] = useIssueOnBadgeMutation();
    const [isUploadCertModal, setIsUploadCertModal] = useState(false);

    const [message, setMessage] = useCatchStatus(
        isSuccess || isError,
        isSuccess ? "Issue badge successfully" : "Issue badge failed",
    );
    console.log(achievementId);

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
            <PageLoading isLoading={isLoading} />

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
                iconBgColor={theme.palette.customColors.orange100}
                iconColor={theme.palette.customColors.orange400}
                confirmButtonColor={theme.palette.primary.main}
                confirmButtonColorHover={theme.palette.primary.dark}
                icon={ForwardToInboxIcon}
            />
            <Button
                onClick={() => setIsUploadCertModal(true)}
                // disabled={isLoading}
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
