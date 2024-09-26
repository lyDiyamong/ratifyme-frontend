// React Library
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import SearchBarCustom from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatYear from "../../utils/formatDate";
import ProfileEarnerModal from "./ProfileEarnerModal";
import NoRecordData from "../../components/NoRecordData";

// Fetching Data Import
import { useFetchEarnerQuery, useDeleteEarnerByIdMutation } from "../../store/api/earnerManagement/earnerApis";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

// ============ Start Table Earner Modal ============
const TableEarner = () => {
    const { data: user } = useCheckAuthQuery();
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const [deleteEarner] = useDeleteEarnerByIdMutation();

    // State for handling modal
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Search query state for filtering earner data
    const [searchQuery, setSearchQuery] = useState("");

    // Earner data fetched from the API
    const earnerData = response?.data;

    //Check auth for the specific role
    const roleId = user?.user?.roleId;

    //Receive the userID
    const { id: userID } = user.user;

    // Display earner in the earner table by the specific role , role = 1 (Admin), role = 2 (institutionOwner), role = 3 (issuer)
    let filteredEarnerData;

    if (roleId === 1) {
        filteredEarnerData = earnerData;
    } else if (roleId === 2) {
        filteredEarnerData = earnerData?.filter((earner) => earner.Issuer?.Institution?.userId === userID);
    } else if (roleId === 3) {
        filteredEarnerData = earnerData?.filter((earner) => earner.Issuer?.userId === userID);
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
            {/* Search Bar */}
            <SearchBarCustom onSearch={setSearchQuery} />

            {/* Modal for Viewing Profile */}
            <ProfileEarnerModal open={openModal} onClose={handleCloseModal} userId={selectedUserId} />

            {/* Table Data Rendering */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : searchedEarnerData && searchedEarnerData.length > 0 ? (
                <TableCustom title="Earner List" data={searchedEarnerData} columns={earnerColumns} />
            ) : (
                // Display this section if no earners match the search query
                <NoRecordData />
            )}
        </Box>
    );
};

export default TableEarner;
// ============ End Table Earner Modal ============
