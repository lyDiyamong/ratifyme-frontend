import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
    Tooltip,
} from "@mui/material";
import { Close, DeleteOutline, RestartAltOutlined } from "@mui/icons-material";
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";
import FormatDate from "../../utils/formatDate";
import {
    useDeleteInvitedUserMutation,
    useFetchAllInvitedUserQuery,
    useResendInviteEarnerMutation,
    useResendInviteIssuerMutation,
} from "../../store/api/userManagement/inviteUserApi";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import { useSelector } from "react-redux";
import AlertMessage from "../alert/AlertMessage";
import InviteUserStatus from "../chips/inviteUserStatus";

// Validation schema for the email input
const schema = yup.object({
    inviteEmail: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("Email is required"),
});

const InviteUserModal = ({ open, handleClose, onSubmit, userType }) => {
    const [deleteInvitedUser] = useDeleteInvitedUserMutation();
    const [resendInviteIssuer] = useResendInviteIssuerMutation();
    const [resendInviteEarner] = useResendInviteEarnerMutation();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);

    const [resendAlertMsg, setResendAlertMsg] = useState("");
    const [resendAlertSuccess, setResendAlertSuccess] = useState(false);
    const [resendConfirmOpen, setResendConfirmOpen] = useState(false);
    const [resendUserEmail, setResendUserEmail] = useState(null);
    const [deleteAlertMsg, setDeleteAlertMsg] = useState("");
    const [deleteAlertSuccess, setDeleteAlertSuccess] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("inviteEmail");
    const [sortOrder, setSortOrder] = useState("inviteEmail");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: invitedUserData, refetch } = useFetchAllInvitedUserQuery({
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });
    const { institutionData, issuerData } = useSelector((state) => state.global);

    // Fetch and filter invited users when data changes
    useEffect(() => {
        if (invitedUserData) {
            const code = userType === "issuer" ? institutionData?.code : issuerData?.code;
            const roleId = userType === "issuer" ? 3 : 4;
            const filteredUsers =
                invitedUserData.data?.filter((user) => user.roleId === roleId && user.inviterCode === code) || [];
            const sortedUsers = filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
            setInvitedUsers(sortedUsers);
        }
    }, [invitedUserData, institutionData, issuerData, userType]);

    const handleDelete = async () => {
        try {
            await deleteInvitedUser({ invitedUserId: userIdToDelete }).unwrap();
            setInvitedUsers((prev) => prev.filter((user) => user.id !== userIdToDelete));

            handleClose();
            setDeleteAlertMsg("User invitation deleted successfully.");
            setDeleteAlertSuccess(true);
        } catch (error) {
            setDeleteAlertMsg("Failed to delete user invitation.");
            setDeleteAlertSuccess(false);
            console.error("Failed to delete invited user:", error);
        } finally {
            setConfirmDelete(false);
        }
    };

    const openConfirmationDialog = (invitedUserId) => {
        setUserIdToDelete(invitedUserId);
        setConfirmDelete(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmDelete(false);
        setUserIdToDelete(null);
    };

    const { handleSubmit, control, reset } = useForm({ mode: "onChange" });

    const internalOnSubmit = (data) => {
        onSubmit(data);
        reset();
    };

    // Function to handle resend invitation
    const confirmResendInvite = async () => {
        try {
            const email = resendUserEmail;
            if (userType === "issuer") {
                await resendInviteIssuer({ institutionId: institutionData?.id, email }).unwrap();
                setResendAlertMsg(`Invitation resent to ${resendUserEmail}`);
                setResendAlertSuccess(true);
            } else {
                await resendInviteEarner({ issuerId: issuerData?.id, email }).unwrap();
                setResendAlertMsg(`Invitation resent to ${resendUserEmail}`);
                setResendAlertSuccess(true);
            }
            handleClose();
            refetch();
        } catch (error) {
            console.error(`Failed to resend invitation to ${resendUserEmail}:`, error);
        } finally {
            setResendConfirmOpen(false);
            setResendUserEmail(null);
        }
    };

    return (
        <>
            {resendAlertMsg && (
                <AlertMessage variant={resendAlertSuccess ? "success" : "error"} onClose={() => setResendAlertMsg("")}>
                    {resendAlertMsg}
                </AlertMessage>
            )}

            {deleteAlertMsg && (
                <AlertMessage variant={deleteAlertSuccess ? "success" : "error"} onClose={() => setDeleteAlertMsg("")}>
                    {deleteAlertMsg}
                </AlertMessage>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                    <Typography variant="h4" sx={{ lineHeight: 2 }}>
                        Invite {userType}
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
                                label={`Invite ${userType} by email`}
                                required
                                schema={schema.fields.inviteEmail}
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

                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                        Recent Invitations
                    </Typography>
                    <List>
                        {invitedUsers.map((invitedUser) => {
                            const email = invitedUser.inviteEmail || "Unknown User";
                            const status = invitedUser.status || "unknown";
                            const expiredInvitation = invitedUser.inviteExpires
                                ? new Date(invitedUser.inviteExpires) < new Date()
                                : false;
                            const isAccountCreated = invitedUser.isAccountCreated || "unknown";

                            return (
                                <ListItem
                                    key={invitedUser.id}
                                    sx={{ backgroundColor: status === "pending" ? "#f5f5f5" : "transparent" }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>{email.charAt(0).toUpperCase() || "?"}</Avatar>
                                    </ListItemAvatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                        <ListItemText primary={email} />
                                        <Box sx={{ display: { md: "flex" } }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {status === true
                                                    ? `Accepted: ${FormatDate(invitedUser.updatedAt)}`
                                                    : `Invited: ${FormatDate(invitedUser.createdAt)}`}
                                            </Typography>

                                            <Box sx={{ ml: { md: 2 } }}>
                                                <InviteUserStatus
                                                    status={status}
                                                    isAccountCreated={isAccountCreated}
                                                    expiredInvitation={expiredInvitation}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Tooltip title="Resend Invitation">
                                        <IconButton
                                            aria-label="resend invitation"
                                            onClick={() => {
                                                setResendUserEmail(email);
                                                setResendConfirmOpen(true);
                                            }}
                                        >
                                            <RestartAltOutlined sx={{ fontSize: { xs: "22px", sm: "24px" } }} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" onClick={() => openConfirmationDialog(invitedUser.id)}>
                                            <DeleteOutline sx={{ fontSize: { xs: "22px", sm: "24px" } }} />
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

            <AlertConfirmation
                open={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this user invitation?"
                onClose={handleCloseConfirmation}
                onConfirm={handleDelete}
                cancelText="Cancel"
                confirmText="Delete"
                iconColor={theme.palette.error.main}
                iconBgColor={theme.palette.customColors.red100}
                icon={DeleteOutline}
                confirmButtonColor={theme.palette.customColors.red300}
            />

            <AlertConfirmation
                open={resendConfirmOpen}
                title="Resend Invitation"
                message={`Are you sure you want to resend the invitation to ${resendUserEmail}?`}
                onClose={() => setResendConfirmOpen(false)}
                onConfirm={confirmResendInvite}
                cancelText="Cancel"
                confirmText="Resend"
                iconColor={theme.palette.customColors.orange400}
                iconBgColor={theme.palette.customColors.orange100}
                icon={RestartAltOutlined}
            />
        </>
    );
};

export default InviteUserModal;
