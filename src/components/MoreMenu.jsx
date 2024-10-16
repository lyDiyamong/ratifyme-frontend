import { useState } from "react";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material"; // Import for better layout

/**
 * MoreMenu Component
 *
 * A reusable component for displaying a dropdown menu with custom items, triggered by an icon.
 *
 * @param {Array} menuItems - An array of menu item objects, each containing `label`, `icon`, and `onClick` properties.
 * @param {object} iconStyles - Custom styles for the menu icon.
 * @param {object} menuStyles - Custom styles for the dropdown menu.
 *
 * @returns {JSX.Element} A rendered menu triggered by an icon.
 *
 * ===== Usage =====
 *
import MoreMenu from "./MoreMenu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MyComponent = () => {
    const menuItems = [
        {
            label: "Edit",
            icon: <EditIcon />,
            onClick: () => alert("Edit clicked"),
        },
        {
            label: "Delete",
            icon: <DeleteIcon />,
            onClick: () => alert("Delete clicked"),
        },
    ];

    return (
        <div>
            <MoreMenu
                menuItems={menuItems}
                iconStyles={{ color: "blue" }}
                menuStyles={{ backgroundColor: "#f0f0f0" }}
            />
        </div>
    );
};
 *
 */
const MoreMenu = ({ menuItems, iconStyles, menuStyles }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MoreHorizRounded
                sx={{
                    color: (theme) => theme.palette.customColors.white,
                    p: 1,
                    fontSize: "48px",
                    cursor: "pointer",
                    backgroundColor: isHovered ? "rgba(0, 0, 0, 0.1)" : "transparent",
                    borderRadius: "50%",
                    transition: "background-color 0.3s",
                    ...iconStyles,
                }}
                onClick={handleMoreClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        ...menuStyles,
                    },
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            item.onClick();
                            handleCloseMenu();
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreMenu;
