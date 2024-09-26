import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { useSelector } from "react-redux";

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
    const userId = useSelector((state) => state.global.userId);


    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Invite Issuer
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                    <Typography
                        component="h4"
                        sx={{
                            fontSize: theme.typography.h4,
                            fontWeight: theme.fontWeight.bold,
                            lineHeight: 2,
                        }}
                    >
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
                        <Box component="form" display="flex" flexDirection="column" gap={2} noValidate>
                            {/* Email */}
                            <FormInput
                                name="email"
                                type="email"
                                control={control}
                                label="Invite issuer by email"
                                required={true}
                            />
                        </Box>
                        <Button
                            variant="contained"
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
                    </Stack>

                    {/* Members list */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        8 Members
                    </Typography>
                    <List>
                        {members.map((member, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar></Avatar>
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
