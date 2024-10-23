// React Library
import { useState } from "react";

// MUI Import
import { Box, Menu, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Custom Import
import ActionButton from "./ActionButton";

/**
 * MenuSelection Component
 *
 * @param {function} onView - Callback function to be called when the "View" option is clicked.
 * @param {function} onDelete - Callback function to be called when the "Delete" option is clicked.
 *
 * @returns {JSX.Element} The rendered MenuSelection component.
 */

// ============ Start Menu Selection ============
const MenuSelection = ({ onView, onDelete }) => {
    // Open and Close Modal
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //Handle Click Anchor in MenuSection
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //Handle Close Anchor in MenuSection
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle View
    const handleView = () => {
        onView();
        handleClose();
    };

    // Handle Delete
    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    return (
        <Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{ sx: { padding: 0 } }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            width: "8ch",
                        },
                    },
                }}
            >
                <Box display="flex" flexDirection="column" width="100%">
                    <ActionButton label="View" onClick={handleView} fullWidth />
                    <ActionButton label="Delete" onClick={handleDelete} fullWidth />
                </Box>
            </Menu>
        </Box>
    );
};

export default MenuSelection;
// ============ End Menu Selection ============

