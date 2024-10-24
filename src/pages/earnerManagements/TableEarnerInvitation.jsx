// React Library Import
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// MUI Import 
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { RestartAltOutlined, DeleteOutline } from "@mui/icons-material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import InviteUserModal from "../../components/modals/InviteUserModal";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import PageLoading from "../../components/loading/PageLoading";
import AlertMessage from "../../components/alert/AlertMessage";
import InviteUserStatus from "../../components/chips/inviteUserStatus";
import getSortOptions from "../../components/GetSortOptions";
import useCatchStatus from "../../hooks/useCatchStatus";
import FormatDate from "../../utils/formatDate";
import theme from "../../assets/themes";

// Fetching Import 
import {
    useInviteEarnerMutation,
    useFetchAllInvitedUserQuery,
    useResendInviteEarnerMutation,
    useDeleteInvitedUserMutation,
} from "../../store/api/userManagement/inviteUserApi";

// ============ Start TableEarnerInvitation ============
const TableEarnerInvitation = () => {
    const isSortable = true;
    // ===================== State Management =====================
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [invitedEarners, setInvitedEarners] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [message, setMessage] = useCatchStatus(false, "");

    // Pagination & Sorting State & Limiting & Searching
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("inviteEmail");
    const [sortOrder, setSortOrder] = useState("inviteEmail");
    const [searchQuery, setSearchQuery] = useState("");

    const [resendAlertMsg, setResendAlertMsg] = useState("");
    const [resendAlertSuccess, setResendAlertSuccess] = useState(false);
    const [resendConfirmOpen, setResendConfirmOpen] = useState(false);
    const [resendUserEmail, setResendUserEmail] = useState(null);

    // ===================== Redux State =====================
    const { issuerData, roleId } = useSelector((state) => state.global);
    const issuerId = issuerData?.id;
    const inviterCode = issuerData?.code;

    // ===================== API Hooks =====================
    const { data: invitedUserData, refetch: refetchInvitedUsers } = useFetchAllInvitedUserQuery({
        inviterCode: roleId === 3 ? inviterCode : undefined,
        roleId: roleId,
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });



    const [inviteEarner, { isLoading, isError, error, isSuccess: apiSuccess, data: newEarner }] = useInviteEarnerMutation();
    const [resendInviteEarner] = useResendInviteEarnerMutation();
    const [deleteInvitedUser] = useDeleteInvitedUserMutation();

    // ===================== Fetch and Sort Invited Earners =====================
    // useEffect(() => {
    //     if (invitedUserData && issuerData?.code) {
    //         const filteredEarners =
    //             invitedUserData.data?.filter((user) => user.roleId === 4 && user.inviterCode === issuerData.code) || [];
    //         const sortedEarners = filteredEarners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //         setInvitedEarners(sortedEarners);
    //     }
    // }, [invitedUserData, issuerData]);

    useEffect(() => {
        if (invitedUserData) {
            // Directly use the invitedUserData.data without filtering or sorting
            setInvitedEarners(invitedUserData.data || []);
        }
    }, [invitedUserData]);

    // ===================== Handle Form Submission =====================
    const handleInviteSubmit = async (data, reset) => {
    try {
        const newEarnerResponse = await inviteEarner({ issuerId, email: data.email }).unwrap();

        // Update the invited earners list immediately without filtering
        setInvitedEarners((prev) => [
            {
                inviteEmail: newEarnerResponse.inviteEmail || data.email,
                status: false,
                createdAt: new Date().toISOString(),
            },
            ...prev,
        ]);

        // Ensure success and message states are set together
        setIsSuccess(true);
        setMessage(newEarnerResponse?.message || "Invitation sent successfully!");

        reset();
    } catch (err) {
        setIsSuccess(false);
        setMessage(err?.data?.message || "Failed to send invitation. Please try again.");
    } finally {
        setDialogOpen(false);
    }
};

    // console.log(invitedEarners);
    // ===================== Handle API Response =====================
    useEffect(() => {
        if (apiSuccess) {
            const successMessage = newEarner?.message || `Invitation sent to ${newEarner?.email} successfully!`;
            setMessage(successMessage);
            setIsSuccess(true);
            refetchInvitedUsers();
        } else if (isError) {
            setMessage(error?.data?.message || "Failed to send invitation. Please try again.");
            setIsSuccess(false);
        }
    }, [apiSuccess, isError, newEarner, error]);

    // ===================== Handle Resend Invitation =====================
    const handleResendInvite = (invitedUser) => {
        setResendUserEmail(invitedUser.inviteEmail);
        setResendConfirmOpen(true);
    };

    const confirmResendInvite = async () => {
        try {
            await resendInviteEarner({ issuerId, email: resendUserEmail }).unwrap();
            setResendAlertMsg(`Invitation resent to ${resendUserEmail}`);
            setResendAlertSuccess(true);
            refetchInvitedUsers();
        } catch (error) {
            setResendAlertMsg(`Failed to resend invitation to ${resendUserEmail}`);
            setResendAlertSuccess(false);
        } finally {
            setResendConfirmOpen(false);
            setResendUserEmail(null);
        }
    };

    // ===================== Handle Delete Confirmation =====================
    const openConfirmationDialog = (invitedUserId) => {
        setUserIdToDelete(invitedUserId);
        setConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            const response = await deleteInvitedUser({ invitedUserId: userIdToDelete }).unwrap();

            // Only update state if the response indicates success
            if (response) {
                setInvitedEarners((prev) => prev.filter((user) => user.id !== userIdToDelete));
                setMessage("User invitation deleted successfully.");
                setIsSuccess(true);
            } else {
                setMessage("Failed to delete user invitation. Please try again.");
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage(error?.data?.message || "Failed to delete user invitation. Please try again.");
            setIsSuccess(false);
        } finally {
            setConfirmDelete(false);
            setUserIdToDelete(null);
        }
    };

    const handleCloseConfirmation = () => {
        setConfirmDelete(false);
        setUserIdToDelete(null);
    };

    // ===================== Table Columns Definition =====================
    const columns = [
        {
            name: "No.",
            selector: (row, index) => index + 1 || "N/A",
        },
        {
            name: "Email",
            cell: (row) => (
                <Box display="flex" alignItems="center" sx={{ width: "750px" }}>
                    <Avatar alt={row.inviteEmail} src={row.avatar} sx={{ width: 32, height: 32, marginRight: 1 }}>
                        {row.inviteEmail ? row.inviteEmail.charAt(0).toUpperCase() : ""}
                    </Avatar>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                        }}
                    >
                        {row.inviteEmail}
                    </Typography>
                </Box>
            ),
        },
        { name: "Invited At", selector: (row) => FormatDate(row.createdAt) },
        {
            name: "Status",
            cell: (row) => {
                const status = row.status || "unknown";
                const isAccountCreated = row.isAccountCreated;
                const expiredInvitation = row.inviteExpires ? new Date(row.inviteExpires) < new Date() : false;

                return (
                    <InviteUserStatus status={status} isAccountCreated={isAccountCreated} expiredInvitation={expiredInvitation} />
                );
            },
        },
        {
            name: "Actions",
            cell: (row) => (
                <Box>
                    <Tooltip title="Resend Invitation">
                        <IconButton onClick={() => handleResendInvite(row)} aria-label="resend invitation" color="primary">
                            <RestartAltOutlined />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Invitation">
                        <IconButton onClick={() => openConfirmationDialog(row.id)} aria-label="delete invitation" color="error">
                            <DeleteOutline />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
            width: "150px",
        },
    ];

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handle rows per page change (limit)
    const handleRowsPerPageChange = (newLimit) => {
        setRowsPerPage(newLimit);
    };

    // Handle sorting change
    const handleSortChange = (column) => {
        const newSortOrder = sortOrder === "-inviteEmail" ? "inviteEmail" : "-inviteEmail";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    // Handle searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // ===================== Render =====================
    if (!invitedUserData) {
        return <PageLoading />;
    }

    return (
        <Box>
            <PageLoading isLoading={isLoading} />

            {message && (
                <AlertMessage variant={isSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}

            {resendAlertMsg && (
                <AlertMessage variant={resendAlertSuccess ? "success" : "error"} onClose={() => setResendAlertMsg("")}>
                    {resendAlertMsg}
                </AlertMessage>
            )}

            <InviteUserModal
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                onSubmit={handleInviteSubmit}
                userType="earner"
            />

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

            <TableCustom
                title="Invited Earners"
                data={invitedEarners}
                columns={columns}
                addNewLabel="Invite Earner"
                addNewBtn={roleId === 3 ? true : false}
                onAddNew={() => setDialogOpen(true)}
                pagination
                totalRows={invitedUserData?.total || 0}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSortChange={handleSortChange}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                onSearch={handleSearch}
                isSortable={isSortable}
                sortOptions={getSortOptions("inviteEmail", "-inviteEmail")}
            ></TableCustom>
        </Box>
    );
};

export default TableEarnerInvitation;
// ============ End TableEarnerInvitation ============