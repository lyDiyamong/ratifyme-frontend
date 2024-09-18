// React Library
import * as React from "react";

// MUI Import
import { Box, Menu, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Custom Import
import ActionButton from "./DataTableActionButton";

// ============ Start Menu Selection ============
const MenuSelection = ({ onView, onDelete, userId }) => {
    // Open and Close Modal
    const [anchorEl, setAnchorEl] = React.useState(null);
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

    return (
        <div>
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
                            width: "128px",
                        },
                    },
                }}
            >
                <Box display="flex" flexDirection="column" width="100%">
                    <ActionButton label="View" onClick={handleView} fullWidth />
                    <ActionButton label="Delete" onClick={handleDelete} fullWidth />
                </Box>
            </Menu>
        </div>
    );
};

export default MenuSelection;
// ============ End Menu Selection ============
