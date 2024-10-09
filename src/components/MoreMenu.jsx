import  { useState } from "react";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const MoreMenu = ({ menuItems, iconStyles, menuStyles }) => {
    const [anchorEl, setAnchorEl] = useState(null);
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
                    
                    ...iconStyles,
                }}
                onClick={handleMoreClick}
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
                        mt: 1,
                        boxShadow: (theme) => theme.customShadows.default,
                        ...menuStyles,
                    },
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        item.onClick();
                        handleCloseMenu();
                    }}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreMenu;
