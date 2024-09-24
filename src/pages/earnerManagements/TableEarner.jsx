// React Library
import { useState } from "react";

// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";

// Custom Import
import SearchBarTest from "../../components/SearchBarCustom";
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatYear from "../../utils/formatDate";
import ProfileEarnerModal from "./ProfileEarnerModal";

// Fetching Data Import
import { useFetchEarnerQuery, useDeleteEarnerByIdMutation } from "../../store/api/earnerManagement/earnerApis";

// ============ Start Table Earner Modal Custom Button ============
const TableEarner = () => {
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const [deleteEarner] = useDeleteEarnerByIdMutation();

    // State for handling modal
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Search query state for filtering earner data
    const [searchQuery, setSearchQuery] = useState("");

    const earnerData = response?.data;

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
            selector: (row) => row.id || 'N/A',
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.User?.username || 'N/A',
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.User?.email || 'N/A',
            sortable: true,
        },
        {
            name: "Badge",
            selector: (row) => row.Achievement?.BadgeClass?.name || 'N/A',
            sortable: true,
        },
        {
            name: "Academic Year",
            selector: (row) => FormatYear({ dateString: row.AcademicBackground?.academicYear }) || 'N/A',
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <MenuSelection onView={() => handleView(row.id)} onDelete={() => handleDelete(row.id)} />
            ),
        },
    ];

    // Filter data based on the search query
    const filteredEarnerData = earnerData?.filter(
        (earner) =>
            earner.User.username.toLowerCase().includes(searchQuery) ||
            earner.User.email.toLowerCase().includes(searchQuery) ||
            earner.Achievement.BadgeClass.name.toLowerCase().includes(searchQuery),
    );

    return (
        <Box>
            {/* Search Bar */}
            <SearchBarTest onSearch={setSearchQuery} />

            {/* Modal for Viewing Profile */}
            <ProfileEarnerModal open={openModal} onClose={handleCloseModal} userId={selectedUserId} />

            {/* Table Data Rendering */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching data</Typography>
            ) : (
                <TableCustom title="Earner List" data={filteredEarnerData} columns={earnerColumns} />
            )}
        </Box>
    );
};

export default TableEarner;
// ============ End Table Earner Modal Custom Button ============
