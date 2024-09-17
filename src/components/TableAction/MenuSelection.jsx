// React Libray
import * as React from "react"; 

// MUI Import
import { Menu, IconButton, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Custom Import
import ActionButton from "./DataTableButton";

// ============ Start Menu Selection ============

// It is the menu selection that will show three dots in the data table component for wrapping two button such as view and delete
const MenuSelection = ({ onView, onDelete }) => {
    // For achhorEl is working on open and close menu selection. It means that when we set to null the menu selection not open
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // This function is working on position the menu relative to the main element.
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //Close menu selection
    const handleClose = () => {
        setAnchorEl(null);
    };

    // It works when user click on view button
    const handleView = () => {
        onView();
        handleClose();
    };

    //It works when user click on delete button
    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    return (
        <div>
            {/* Three dots Icon */}
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
            {/* Wrap View and Delete Button */}
            <Menu
                id="long-menu"
                MenuListProps={{
                    // we use MenuListProps because of Menu can't apply style directly
                    sx: { padding: 0 },
                }}
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
