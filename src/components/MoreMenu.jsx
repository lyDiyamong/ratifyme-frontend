import { useState } from "react";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material"; // Import for better layout

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
