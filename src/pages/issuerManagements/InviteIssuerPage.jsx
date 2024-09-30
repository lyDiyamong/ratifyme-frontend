// React library import
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// MUI import
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    IconButton,
    Divider,
    Stack,
    Box,
    Chip,
} from "@mui/material";
import { CheckCircle, Close, ErrorOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";
import { useFetchAllInvitedUserQuery, useInviteIssuerMutation } from "../../store/api/userManagement/inviteUserApi";

const statusChipColor = (status) => {
    if (status === true) {
        return {
            label: "Accepted",
            color: theme.palette.customColors.green300,
            backgroundColor: theme.palette.customColors.green100,
            icon: <CheckCircle fontSize="small" color={theme.palette.customColors.green300} />,
        };
    }

    return {
        label: "Pending", // Label for pending status
        color: theme.palette.customColors.orange300, // Custom background color
        backgroundColor: theme.palette.customColors.orange100,
        icon: <ErrorOutline fontSize="small" color={theme.palette.customColors.orange200} />,
    };
};

const InviteIssuerPage = () => {
    const [open, setOpen] = useState(false);
    const { institutionData } = useSelector((state) => state.global);
    const institutionId = institutionData?.id;
    const [inviteIssuer] = useInviteIssuerMutation(institutionId);
    const { data: invitedUserData } = useFetchAllInvitedUserQuery();
    const [invitedIssuers, setInvitedIssuers] = useState([]);

    useEffect(() => {
        if (invitedUserData) {
            const filteredIssuers =
                invitedUserData.data?.filter(
                    (user) => user.roleId === 3 && user.inviterCode === institutionData.code,
                ) || [];
            // Sort by createdAt in descending order
            const sortedIssuers = filteredIssuers.sort(
                (issuerA, issuerB) => new Date(issuerB.createdAt) - new Date(issuerA.createdAt),
            );

            setInvitedIssuers(sortedIssuers);
        }
    }, [invitedUserData, institutionData]);

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Send invitation
            const newIssuer = await inviteIssuer({ institutionId, email: data.email }).unwrap();

            // Immediately update the local state with the new invited issuer
            setInvitedIssuers((prev) =>
                [
                    {
                        inviteEmail: newIssuer.inviteEmail || data.email,
                        status: false,
                        createdAt: new Date().toISOString(),
                    },
                    ...prev, // Keep existing issuers
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            );

            reset();
        } catch (error) {
            console.error("Error sending invitation", error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Invite Issuer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                // sx={{
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //     width: '100%'
                // }}
                // PaperProps={{
                //     sx: {
                //         height: "60%",
                //         maxHeight: "80vh",
                //         overflowY: "auto",
                //         display: "flex",
                //         alignItems: "center",
                //         width: "100%",
                //     },
                // }}
            >
                <DialogTitle>
                    <Typography variant="h4" sx={{ lineHeight: 2 }}>
                        Invite Issuer
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack>
                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormInput
                                name="email"
                                type="email"
                                control={control}
                                label="Invite issuer by email"
                                required={true}
                            />
                            {errors.email && (
                                <Typography color="error">{errors.email.message || "Invalid email address"}</Typography>
                            )}
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    color: theme.palette.background.default,
                                    borderRadius: theme.customShape.btn,
                                    fontWeight: theme.fontWeight.bold,
                                }}
                            >
                                Invite
                            </Button>
                        </Box>
                    </Stack>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        {invitedIssuers.length} Members
                    </Typography>
                    <List>
                        {invitedIssuers.map((issuer, index) => {
                            const email = issuer.inviteEmail || "";
                            const status = issuer.status || "unknown";
                            const { label, color, backgroundColor, icon } = statusChipColor(status);
                            return (
                                <ListItem
                                    key={index}
                                    sx={{ backgroundColor: status === "pending" ? "#f5f5f5" : "transparent" }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>{email.charAt(0).toUpperCase() || "?"}</Avatar>
                                    </ListItemAvatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                        <ListItemText primary={email || "Unknown User"} />
                                        <Typography variant="body2" color="textSecondary">
                                            {status === true
                                                ? `Accepted on ${issuer.updatedAt}`
                                                : `Pending on ${issuer.createdAt}`}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={label}
                                        icon={icon}
                                        size="small"
                                        sx={{
                                            ml: 2,
                                            backgroundColor: backgroundColor,
                                            color: color,
                                            borderRadius: theme.customShape.section,
                                        }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InviteIssuerPage;
