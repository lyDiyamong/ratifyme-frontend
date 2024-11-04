// React Library
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatYear from "../../utils/formatDate";
import ProfileEarnerModal from "./ProfileEarnerModal";
import InviteUserModal from "../../components/modals/InviteUserModal";
import { TableAvatars } from "../../components/avartars/TableAvatars";
import theme from "../../assets/themes";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";
import getSortOptions from "../../components/GetSortOptions";
import AlertConfirmation from "../../components/alert/AlertConfirmation";

// Fetching Data Import
import { useFetchEarnerQuery, useDeleteEarnerByIdMutation } from "../../store/api/earnerManagement/earnerApis";
import { useInviteEarnerMutation, useFetchAllInvitedUserQuery } from "../../store/api/userManagement/inviteUserApi";
import { DeleteForeverOutlined } from "@mui/icons-material";


// ============ Start Table Earner Modal ============
const TableEarner = () => {
    const isSortable = true;
    // State for controlling dialog
    const [dialogOpen, setDialogOpen] = useState(false);

    // Pagination & Sorting State & Limiting & Searching
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const { roleId, userId, issuerData, institutionData } = useSelector((state) => state.global);
    const [deleteEarner, { isSuccess: isDeleteEarnerSuccess, error: deleteEarnerError }] = useDeleteEarnerByIdMutation();
    const issuerId = issuerData?.id;
    const { data: invitedUserData } = useFetchAllInvitedUserQuery();
    const [inviteEarner] = useInviteEarnerMutation();

    const [message, setMessage] = useCatchStatus(
        isDeleteEarnerSuccess,
        isDeleteEarnerSuccess ? "Deleted earner successfully" : deleteEarnerError?.data?.message,
    );

    const institutionId = institutionData?.id;
    // Local State for invited users
    const [invitedEarners, setInvitedEarners] = useState([]);

    // Fetch data from the backend based on pagination, sorting, and search
    const {
        data: response,
        isLoading,
        isError,
    } = useFetchEarnerQuery({
        issuerId: roleId === 1 ? undefined : issuerId,
        roleId: roleId,
        institutionId: roleId === 2 ? institutionId : undefined,
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });
    console.log(response);

    // Load and filter invited users on mount
    useEffect(() => {
        if (invitedUserData && issuerData?.code) {
            const filteredIssuers =
                invitedUserData.data?.filter((user) => user.roleId === 4 && user.inviterCode === issuerData.code) || [];

            const sortedIssuers = filteredIssuers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setInvitedEarners(sortedIssuers);
        }
    }, [invitedUserData, issuerData]);

    // State for handling modal
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Earner data fetched from the API
    const earnerData = response?.data;

    // Display earner in the earner table by the specific role , role = 1 (Admin), role = 2 (institutionOwner), role = 3 (issuer)
    const filteredEarnerData =
        roleId === 1
            ? earnerData
            : earnerData
                  ?.filter((earner) => (roleId === 2 ? earner.institutionId === institutionId : earner.Issuer?.userId === userId))
                  .map((earner) => ({
                      ...earner,
                      Achievements: [
                          ...new Map(earner.Achievements.map((achievement) => [achievement.badgeClassId, achievement])).values(),
                      ],
                  }));

    // Handle View (open the modal)
    const handleView = (userId) => {
        setSelectedUserId(userId);
        setOpenModal(true);
    };

    // Handle Close Modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUserId(null);
    };

    const handleDeleteClick = (userId) => {
        setSelectedRowId(userId); // <-- Set the selected row ID here
        setIsDeleteOpen(true); // <-- Open delete confirmation modal
    };
    // Handle Delete row in table
    const handleDelete = async () => {
        try {
            await deleteEarner(selectedRowId).unwrap();
            setIsDeleteOpen(false); // Close the dialog after delete
            setSelectedRowId(null); // Reset the selected row ID
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    const handleInviteEarner = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleInviteSubmit = async (data, reset) => {
        try {
            const newEarner = await inviteEarner({ issuerId, email: data.email }).unwrap();
            setInvitedEarners((prev) =>
                [
                    {
                        inviteEmail: newEarner.inviteEmail || data.email,
                        status: false,
                        createdAt: new Date().toISOString(),
                    },
                    ...prev,
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            );

            reset();
            setDialogOpen(false); // Close the dialog on success
        } catch (error) {
            console.error("Error sending invitation", error);
        }
    };

    // Define the columns including the action column
    const earnerColumns = [
        {
            name: "No.",
            selector: (row, index) => index + 1 || "N/A",
        },
        {
            name: "Name",
            selector: (row) => <TableAvatars profileImage={row.User.profileImage} name={`${row.User.firstName} ${row.User.lastName}`} />,
        },
        {
            name: "Email",
            selector: (row) => row.User?.email || "N/A",
        },
        {
            name: "Date Of Birth",
            selector: (row) => FormatYear(row.User?.dateOfBirth) || "N/A",
        },
        {
            name: "Badge",
            selector: (row) => (row.Achievements.length === 0 ? 0 : row.Achievements.length),
        },
        {
            name: "Action",
            selector: (row) => <MenuSelection onView={() => handleView(row.id)} onDelete={() => handleDeleteClick(row.id)} />,
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
        const newSortOrder = sortOrder === "-name" ? "name" : "-name";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    // Handle searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <Box>
            {message && (
                <AlertMessage variant={isDeleteEarnerSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <AlertConfirmation
                open={isDeleteOpen}
                title="Delete Earner"
                message="Are you sure you want to delete this earner? This action cannot be undone."
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                confirmText="Delete"
                cancelText="Cancel"
                iconBgColor={theme.palette.customColors.red100}
                iconColor={theme.palette.customColors.red200}
                confirmButtonColor={theme.palette.customColors.red300}
                confirmButtonColorHover={theme.palette.customColors.red400}
                icon={DeleteForeverOutlined}
            />
            {/* Modal for Viewing Profile */}
            <ProfileEarnerModal open={openModal} onClose={handleCloseModal} userId={selectedUserId} />

            {/* Table Data Rendering */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : (
                <TableCustom
                    title="Earner List"
                    data={filteredEarnerData}
                    columns={earnerColumns}
                    onAddNew={handleInviteEarner}
                    addNewLabel="Invite Earner"
                    pagination
                    totalRows={response?.total || 0}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    isSortable={isSortable}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSearch={handleSearch}
                    addNewBtn={false}
                    sortOptions={getSortOptions("name", "-name")}
                ></TableCustom>
            )}

            {/* Invite Earner Modal */}
            <InviteUserModal
                open={dialogOpen}
                handleClose={handleCloseDialog}
                onSubmit={handleInviteSubmit}
                invitedUsers={invitedEarners}
            />
        </Box>
    );
};

export default TableEarner;
// ============ End Table Earner Modal ============
