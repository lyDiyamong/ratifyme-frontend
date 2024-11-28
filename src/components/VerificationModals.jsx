// React library import
import React, { useEffect, useState } from "react";

// MUI import
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Typography,
    Divider,
    Stack,
    Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CheckCircle } from "@mui/icons-material";

// Custom import
import theme from "../assets/themes";
import FormatDate from "../utils/formatDate";

//=========== Start Verification Modal ===========
const VerificationModal = ({ open, handleClose, achieveData, earnerData, credId, earnerAchieData }) => {
    const [loadingStates, setLoadingStates] = useState({
        IssuedOn: false,
        IssuedBy: false,
        ClaimedOn: false,
        IssuedTo: false,
        CredentialId: false,
        ExpiredDate: false,
    });

    // Simulates sequential loading with a timer
    const simulateSequentialLoading = () => {
        const keys = ["IssuedOn", "IssuedBy", "ClaimedOn", "IssuedTo", "CredentialId", "ExpiredDate"];
        keys.forEach((key, index) => {
            setTimeout(() => {
                setLoadingStates((prev) => ({ ...prev, [key]: true }));
            }, index * 1000);
        });
    };

    // Check if all loadingStates are true
    const allLoaded = Object.values(loadingStates).every((state) => state === true);

    useEffect(() => {
        if (open) {
            // Reset states and start loading simulation
            setLoadingStates({
                IssuedOn: false,
                IssuedBy: false,
                ClaimedOn: false,
                IssuedTo: false,
                CredentialId: false,
                ExpiredDate: false,
            });

            simulateSequentialLoading();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.bold }}>
                    Credential Verification
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon sx={{ color: theme.palette.customColors.gray300 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <List>
                    {["IssuedOn", "IssuedBy", "ClaimedOn", "IssuedTo", "CredentialId", "ExpiredDate"].map((key) => (
                        <React.Fragment key={key}>
                            <ListItem>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {loadingStates[key] ? (
                                        <Box
                                            sx={{
                                                bgcolor: theme.palette.action.hover,
                                                borderRadius: "50%",
                                                width: 26,
                                                height: 26,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <CheckIcon sx={{ color: theme.palette.primary.main }} />
                                        </Box>
                                    ) : (
                                        <CircularProgress size={22} />
                                    )}
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1">
                                                {`${key.replace(/([A-Z])/g, " $1")}: `}
                                                <Typography
                                                    component="span"
                                                    sx={{ color: loadingStates[key] ? "gray" : "inherit" }}
                                                >
                                                    {loadingStates[key]
                                                        ? key === "IssuedOn"
                                                            ? FormatDate(achieveData?.BadgeClass?.startedDate)
                                                            : key === "IssuedBy"
                                                            ? `${achieveData?.BadgeClass?.Issuer?.User?.firstName} ${achieveData?.BadgeClass?.Issuer?.User?.lastName}`
                                                            : key === "ClaimedOn"
                                                            ? FormatDate(earnerAchieData?.claimedOn)
                                                            : key === "IssuedTo"
                                                            ? `${earnerData?.name}`
                                                            : key === "ExpiredDate"
                                                            ? FormatDate(achieveData?.BadgeClass?.expiredDate)
                                                            : credId
                                                        : "..."}
                                                </Typography>
                                            </Typography>
                                        }
                                    />
                                </Box>
                            </ListItem>

                            <Divider />
                        </React.Fragment>
                    ))}
                </List>

                {/* Conditionally render "Done" when all items are loaded */}
                {allLoaded && (
                    <Stack
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: "#F3FAFA",
                            borderRadius: theme.customShape.input,
                            border: "1px solid #C5E3E3",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack gap={1}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CheckCircle sx={{ fontSize: 24, color: "#0AA4A5" }} />
                                    <Typography variant="body1" color="#0AA4A5" fontWeight="bold">
                                        This is a valid credential
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="body2">
                                        This credential was securely issued via RatifyME. All the displayed information is valid.
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VerificationModal;
//=========== End Verification Modal ===========
