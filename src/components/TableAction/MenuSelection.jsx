// React library
import { useState } from "react";
import { useSelector } from "react-redux";

// MUI import
import { Box, Menu, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Custom import
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
    // Fetch roleId from global state
    const { roleId } = useSelector((state) => state.global);

    // Open and Close Modal
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // View data
    const handleView = () => {
        onView();
        handleClose();
    };

    // Delete data
    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    // Conditionally render the three-dot menu or just the View button
    if (roleId === 1) {
        return (
            <Box>
                <ActionButton label="View" onClick={handleView} fullWidth />
            </Box>
        );
    }

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
