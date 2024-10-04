import React from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Divider,
    Stack,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Chip,
    Tooltip,
} from "@mui/material";
import { Close, CheckCircle, ErrorOutline, DeleteOutline, RestartAltOutlined } from "@mui/icons-material";
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";
import FormatDate from "../../utils/formatDate";
import DeleteIcon from "@mui/icons-material/Delete";

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

const InviteUserModal = ({ open, handleClose, onSubmit, invitedUsers }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const internalOnSubmit = (data) => {
        onSubmit(data); // Call the parent function to submit the data
        reset(); // Reset form after successful submit
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Typography variant="h4" sx={{ lineHeight: 2 }}>
                    Invite Issuer
                </Typography>
                <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
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
                        onSubmit={handleSubmit(internalOnSubmit)}
                    >
                        <FormInput
                            name="email"
                            type="email"
                            control={control}
                            label="Invite issuer by email"
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 1,
                                mb: 2,
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.semiBold,
                                textTransform: "none",
                            }}
                        >
                            Send invites
                        </Button>
                    </Box>
                </Stack>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    {invitedUsers.length} Members
                </Typography>
                <List>
                    {invitedUsers.map((issuer, index) => {
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
                                    <Stack direction="row">
                                        <Typography variant="body2" color="textSecondary">
                                            {status === true
                                                ? `Accepted: ${FormatDate(issuer.updatedAt)}`
                                                : `Invited: ${FormatDate(issuer.createdAt)}`}
                                        </Typography>
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
                                    </Stack>
                                </Box>
                                <Tooltip title="Resend Invitation">
                                    <IconButton aria-label="resend invitation">
                                        <RestartAltOutlined />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="delete">
                                        <DeleteOutline />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InviteUserModal;
