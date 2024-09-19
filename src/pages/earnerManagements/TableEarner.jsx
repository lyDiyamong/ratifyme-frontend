// MUI Import
import { Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";

// Custom Import
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatYear from "../../utils/fomatYear";
import ProfileEarnerModal from "./ProfileEarnerModal";

// Fetching Data Import
import {
  useFetchEarnerQuery,
  useDeleteEarnerByIdMutation
} from "../../store/api/earnerManagement/earnerApis";

// ============ Start Table Earner Modal Custom Button ============
const TableEarner = () => {
  const { data: response, isLoading, isError } = useFetchEarnerQuery();
  const [deleteEarner] = useDeleteEarnerByIdMutation();

  // State for handling modal
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Name",
      selector: (row) => row.User.username,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.User.email,
      sortable: true
    },
    {
      name: "Badge",
      selector: (row) => row.Achievement.BadgeClass.name,
      sortable: true
    },
    {
      name: "Academic Year",
      selector: (row) => FormatYear(row.AcademicBackground.academicYear),
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => (
        <MenuSelection
          onView={() => handleView(row.id)}
          onDelete={() => handleDelete(row.id)}
        />
      )
    }
  ];

  return (
    <Box>
      {/* Modal for Viewing Profile */}
      <ProfileEarnerModal
        open={openModal}
        onClose={handleCloseModal}
        userId={selectedUserId}
      />

      {/* Table Data Rendering */}
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Error fetching data</Typography>
      ) : (
        <TableCustom
          title="Earner List"
          data={earnerData}
          columns={earnerColumns}
        />
      )}
    </Box>
  );
};

export default TableEarner;
// ============ End Table Earner Modal Custom Button ============
