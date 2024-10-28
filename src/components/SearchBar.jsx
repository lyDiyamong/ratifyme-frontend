// React import
import React from "react";
import { Link } from "react-router-dom";

// MUI import
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

// Custom import
import DashboardContainer from "./styles/DashboardContainer";
import theme from "../assets/themes";
import { Add } from "@mui/icons-material";

// Styled components
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.customShape.btn,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    maxWidth: "1600px",

    [theme.breakpoints.up("md")]: {
        width: "90%",
    },
    [theme.breakpoints.down("md")]: {
        width: "70%",
    },

    boxShadow: theme.customShadows.default,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(2, 2, 2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "25ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("lg")]: {
            width: "70ch",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
}));

/**
 * SearchBar Component
 *
 * A reusable search bar component with optional button functionality.
 *
 * @param {boolean} [showButton=true] - A flag to show or hide the button beside the search input.
 * @param {string} [textInButton] - Text to display in the button when `showButton` is true.
 * @param {Function} onSearchChange - Callback function to handle the search input changes.
 * @param {React.ReactNode} [children] - Child elements to render inside the dashboard container below the search bar.
 *
 * @returns {JSX.Element} A styled search bar component with optional button and search input functionality.
 *
 * @example
 * Example usage with a button and a search input
 * <SearchBar
 *   showButton={true}
 *   textInButton="Create Badge"
 *   onSearchChange={handleSearch}
 * >
 *   <BadgeList badges={filteredBadges} />
 * </SearchBar>
 *
 * @example
 * Example usage without a button
 * <SearchBar showButton={false} onSearchChange={handleSearch}>
 *   <BadgeList badges={filteredBadges} />
 * </SearchBar>
 */
export default function SearchBar({
    showButton = true,
    textInButton,
    badges,
    onSearchChange,
    total,
    onPage,
    limit,
    page,
    result,
    isLoading,
    isError,
    children,
}) {
    const handleSearchChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        <Stack gap={4}>
            <Box sx={{ flexGrow: 1, marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Search bar with flexible width */}
                <Search
                    sx={{
                        flexGrow: 1, // allows the search bar to take up remaining space
                        borderRadius: theme.customShape.section,
                        backgroundColor: theme.palette.customColors.white,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        sx={{ width: "100%" }}
                        placeholder="Search for Badges..."
                        inputProps={{ "aria-label": "search" }}
                        onChange={handleSearchChange}
                    />
                </Search>

                {/* Button with fixed size */}
                {showButton && (
                    <Link to="/dashboard/management/badges/badgecreation">
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.customColors.white,
                                borderRadius: theme.customShape.btn,
                                textTransform: "none",
                                paddingY: "8px",
                                boxShadow: theme.customShadows.default,
                                fontWeight: theme.fontWeight.bold,
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {textInButton}
                        </Button>
                    </Link>
                )}
            </Box>

            <DashboardContainer
                sx={{
                    backgroundColor: theme.palette.customColors.white,
                    borderRadius: theme.customShape.section,
                    border: theme.palette.cardBorder,
                    boxShadow: theme.customShadows.default,
                }}
            >
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, { badges, total, onPage, page, limit, result, isError, isLoading }),
                )}
            </DashboardContainer>
        </Stack>
    );
}
