import { useState, useEffect } from "react";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import InviteUserModal from "../../components/modals/InviteUserModal";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import theme from "../../assets/themes";
import {
    useInviteIssuerMutation,
    useFetchAllInvitedUserQuery,
    useResendInviteIssuerMutation,
    useDeleteInvitedUserMutation,
} from "../../store/api/userManagement/inviteUserApi";
import { useSelector } from "react-redux";
import { CheckCircleOutline, ErrorOutlineOutlined, RestartAltOutlined, DeleteOutline } from "@mui/icons-material";
import TableCustom from "../../components/TableCustom";
import FormatDate from "../../utils/formatDate";
import PageLoading from "../../components/loading/PageLoading";
import useCatchStatus from "../../hooks/useCatchStatus";
import AlertMessage from "../../components/alert/AlertMessage";
import InviteUserStatus from "../../components/chips/inviteUserStatus";
import NoRecordData from "../../components/NoRecordData";
import getSortOptions from "../../components/GetSortOptions";

const TableIssuerInvitation = () => {
    const isSortable = true;
    // ===================== State Management =====================
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [invitedIssuers, setInvitedIssuers] = useState([]);
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
    const { institutionData, roleId } = useSelector((state) => state.global);
    const institutionId = institutionData?.id;
    const inviterCode = institutionData.code;

    // ===================== API Hooks =====================
    const { data: invitedUserData, refetch: refetchInvitedUsers } = useFetchAllInvitedUserQuery({
        inviterCode: roleId === 2 ? inviterCode : undefined,
        roleId: roleId,
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });

    const [inviteIssuer, { isLoading, isError, error, isSuccess: apiSuccess, data: newIssuer }] = useInviteIssuerMutation();
    const [resendInviteIssuer] = useResendInviteIssuerMutation();
    const [deleteInvitedUser] = useDeleteInvitedUserMutation();

    // ===================== Fetch and Sort Invited Issuers =====================
    // useEffect(() => {
    //     if (invitedUserData && institutionData?.code) {
    //         const filteredIssuers =
    //             invitedUserData.data?.filter((user) => user.roleId === 3 && user.inviterCode === institutionData.code) || [];
    //         const sortedIssuers = filteredIssuers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //         setInvitedIssuers(sortedIssuers);
    //     }
    // }, [invitedUserData, institutionData]);

    useEffect(() => {
        if (invitedUserData) {
            // Directly use the invitedUserData.data without filtering or sorting
            const filteredIssuers =
                invitedUserData.data?.filter((user) => user.roleId === 3 && user.inviterCode === institutionData.code) || [];

            setInvitedIssuers(filteredIssuers);
        }
    }, [invitedUserData, institutionData]);
    
    const handleInviteSubmit = async (data, reset) => {
        try {
            const newIssuerResponse = await inviteIssuer({ institutionId, email: data.email }).unwrap();

            // Update the invited issuers list immediately without sorting
            setInvitedIssuers((prev) => [
                {
                    inviteEmail: newIssuerResponse.inviteEmail || data.email,
                    status: false,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ]);

            // Ensure success and message states are set together
            setIsSuccess(true);
            setMessage(newIssuerResponse?.message || "Invitation sent successfully!");

            reset(); // Reset the form fields
        } catch (err) {
            setIsSuccess(false);
            setMessage(err?.data?.message || "Failed to send invitation. Please try again.");
        } finally {
            setDialogOpen(false); // Close dialog whether success or error
        }
    };

    console.log(invitedUserData?.total);
    console.log(invitedIssuers);

    // ===================== Handle API Response =====================
    useEffect(() => {
        if (apiSuccess) {
            const successMessage = newIssuer?.message || `Invitation sent to ${newIssuer?.email} successfully!`;
            setMessage(successMessage);
            setIsSuccess(true); // Ensure success is set to true here
            refetchInvitedUsers();
        } else if (isError) {
            setMessage(error?.data?.message || "Failed to send invitation. Please try again.");
            setIsSuccess(false); // Ensure success is set to false here
        }
    }, [apiSuccess, isError, newIssuer, error]);

    // ===================== Handle Resend Invitation =====================
    const handleResendInvite = (invitedUser) => {
        setResendUserEmail(invitedUser.inviteEmail);
        setResendConfirmOpen(true);
    };

    const confirmResendInvite = async () => {
        try {
            await resendInviteIssuer({ institutionId, email: resendUserEmail }).unwrap();
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
                setInvitedIssuers((prev) => prev.filter((user) => user.id !== userIdToDelete));
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
            sortable: true,
        },
        { name: "Invited At", selector: (row) => FormatDate(row.createdAt), sortable: true },
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
                <>
                    <Tooltip title="Resend Invitation">
                        <IconButton aria-label="resend invitation" onClick={() => handleResendInvite(row)} color="primary">
                            <RestartAltOutlined
                                sx={{
                                    fontSize: {
                                        xs: "22px",
                                        sm: "24px",
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={() => openConfirmationDialog(row.id)} color="error">
                            <DeleteOutline
                                sx={{
                                    fontSize: {
                                        xs: "22px",
                                        sm: "24px",
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </>
            ),
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

    // ===================== Render Component =====================
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
                userType="issuer"
            />

            <AlertConfirmation
                open={alertOpen}
                title="Invite Issuer"
                message={alertMsg}
                onClose={() => setAlertOpen(false)}
                cancelText="OK"
                confirmText="View invite list"
                iconColor={isSuccess ? theme.palette.customColors.green400 : theme.palette.customColors.red200}
                iconBgColor={isSuccess ? theme.palette.customColors.green100 : theme.palette.customColors.red100}
                icon={isSuccess ? CheckCircleOutline : ErrorOutlineOutlined}
            />

            <TableCustom
                title="Invited Issuers"
                data={invitedIssuers}
                columns={columns}
                sortIcon={true}
                addNewLabel="Invite Issuer"
                addNewBtn={roleId === 2 ? true : false}
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
            >
                {invitedIssuers.length === 0 && <NoRecordData />}
            </TableCustom>

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
        </Box>
    );
};

export default TableIssuerInvitation;
