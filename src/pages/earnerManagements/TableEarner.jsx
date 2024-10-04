// React Library
import { useEffect, useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import TableCustom from "../../components/TableCustom";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatYear from "../../utils/formatDate";
import ProfileEarnerModal from "./ProfileEarnerModal";
import NoRecordData from "../../components/NoRecordData";

// Fetching Data Import
import { useFetchEarnerQuery, useDeleteEarnerByIdMutation } from "../../store/api/earnerManagement/earnerApis";
import { useSelector } from "react-redux";
import InviteUserModal from "../../components/modals/InviteUserModal";
import { useInviteEarnerMutation, useFetchAllInvitedUserQuery } from "../../store/api/userManagement/inviteUserApi";

// ============ Start Table Earner Modal ============
const TableEarner = ({ searchQuery }) => {
    // State for controlling dialog
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const { roleId, userId, issuerData } = useSelector((state) => state.global);
    const [deleteEarner] = useDeleteEarnerByIdMutation();
    const issuerId = issuerData?.id;
    const { data: invitedUserData } = useFetchAllInvitedUserQuery();
    const [inviteEarner] = useInviteEarnerMutation();

    // Local State for invited users
    const [invitedEarners, setInvitedEarners] = useState([]);

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

    // Search query state for filtering earner data
    // const [searchQuery, setSearchQuery] = useState("");

    // Earner data fetched from the API
    const earnerData = response?.data;

    // Display earner in the earner table by the specific role , role = 1 (Admin), role = 2 (institutionOwner), role = 3 (issuer)
    let filteredEarnerData;

    if (roleId === 1) {
        filteredEarnerData = earnerData;
    } else if (roleId === 2) {
        filteredEarnerData = earnerData?.filter((earner) => earner.Issuer?.Institution?.userId === userId);
    } else if (roleId === 3) {
        filteredEarnerData = earnerData?.filter((earner) => earner.Issuer?.userId === userId);
    }

    // Further filter based on the search query (optional)
    const searchedEarnerData = filteredEarnerData?.filter((earner) =>
        earner.User.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

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

    // Handle Delete row in table
    const handleDelete = async (userId) => {
        try {
            await deleteEarner(userId).unwrap();
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
            // Send invitation via API
            const newEarner = await inviteEarner({ issuerId, email: data.email }).unwrap();

            // Update local state with the new invited issuer
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
            name: "ID",
            selector: (row) => row.id || "N/A",
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.User?.username || "N/A",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.User?.email || "N/A",
            sortable: true,
        },
        {
            name: "Date Of Birth",
            selector: (row) => FormatYear(row.User?.dateOfBirth) || "N/A",
            sortable: true,
        },
        {
            name: "Badge",
            selector: (row) => row.Achievement?.BadgeClass?.name || "N/A",
            sortable: true,
        },
        {
            name: "Academic Year",
            selector: (row) => FormatYear(row.AcademicBackground?.academicYear) || "N/A",
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <MenuSelection onView={() => handleView(row.id)} onDelete={() => handleDelete(row.id)} />
            ),
        },
    ];

    return (
        <Box>
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
                    data={searchedEarnerData}
                    columns={earnerColumns}
                    onAddNew={handleInviteEarner}
                    addNewLabel="Invite Earner"
                >
                    {/* Display NoRecordData inside the table when no earners match the search query */}
                    {searchedEarnerData?.length === 0 && <NoRecordData />}
                </TableCustom>
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
