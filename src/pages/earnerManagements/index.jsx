// React Library
import  { useState } from "react";

// MUI Import
import DashboardContainer from "../../components/styles/DashboardContainer";

// Custom Import
import ProfileEarnerModal from "./ProfileEarnerModal";
import TableEarner from "./TableEarner";

// Fetching data
import { useDeleteEarnerByIdMutation } from "../../store/api/earnerManagement/earnerApis";

// ============ Start EarnerManagement ============
const EarnerManagement = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [ deleteEarner] = useDeleteEarnerByIdMutation();

    // Handle View
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
        console.log(userId);
        try {
          await deleteEarner(userId).unwrap();
        } catch (err) {
          console.error('Failed to delete:', err);
        }
      };

    return (
        <DashboardContainer>
            <ProfileEarnerModal open={openModal} onClose={handleCloseModal} userId={selectedUserId} />
            <TableEarner
                onView={handleView}
                onDelete={handleDelete}
            />
        </DashboardContainer>
    );
};

export default EarnerManagement;
// ============ End EarnerManagement ============