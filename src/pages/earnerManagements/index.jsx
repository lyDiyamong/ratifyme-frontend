// React Library
import { useState } from "react";

// MUI Import
import { Box } from "@mui/material";

// Custom Import
import ProfileEarnerModal from "./ProfileEarnerModal";
import TableEarner from "./TableEarner"; 

const EarnerManagement = () => {
    const [selectedUserId, setSelectedUserId] = useState(4); 
    const [openModal, setOpenModal] = useState(false); 

    const handleView = (userId) => {
        setSelectedUserId(userId); 
        setOpenModal(true);
    };

    const handleDelete = () => {
        console.log("Delete action triggered");
    };

    const handleCloseModal = () => {
        setOpenModal(false); 
        setSelectedUserId(4);
    };

    return (
        <Box>
            <ProfileEarnerModal open={openModal} onClose={handleCloseModal} userId={selectedUserId} />
            <TableEarner onView={handleView} onDelete={handleDelete} />
        </Box>
    );
};

export default EarnerManagement;

