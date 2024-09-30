import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";
import { useInviteIssuerMutation } from "../../store/api/userManagement/inviteUserApi";

const members = [
    { email: "bukunmi@gmail.com" },
    { email: "chinedu@gmail.com" },
    { email: "abubakar@gmail.com" },
    { email: "ademola@gmail.com" },
    { email: "idowu@gmail.com" },
    { email: "mary@gmail.com" },
];

const InviteIssuerPage = () => {
    const [open, setOpen] = useState(false);
    const { institutionData } = useSelector((state) => state.global);
    const institutionId = institutionData?.id;
    const [inviteIssuer] = useInviteIssuerMutation(institutionId);

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await inviteIssuer({ institutionId, email: data.email });
        } catch (error) {
            console.error("Error sending invitation", error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Invite Issuer
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
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
                        {/* Invite user section */}
                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* Email */}
                            <FormInput
                                name="email"
                                type="email"
                                control={control}
                                label="Invite issuer by email"
                                required={true}
                            />

                            {errors.email && (
                                <Typography color="error">
                                    {errors.email.message || "Invalid email address"}
                                </Typography>
                            )}

                            {/* Submit Button */}
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

                    {/* Members list */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        {members.length} Members
                    </Typography>
                    <List>
                        {members.map((member, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar key={index}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={member.email} />
                            </ListItem>
                        ))}
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
