//React Import Library
import React, { useState } from "react";


// MUI Import
import { Box, InputBase ,Button, Stack, styled, alpha, Link} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Custom Import
import DashboardContainer from "./styles/DashboardContainer";
import theme from "../assets/themes";

// Styled components
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.customShape.input,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        width: "60%",
    },
    [theme.breakpoints.up("md")]: {
        width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginRight: theme.spacing(0),
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


// Static data that make the code not error. (White screen)
const cardBadgeData = [
    { title: "Badge 1", institution: "Institution 1" },
    { title: "Badge 2", institution: "Institution 2" },
];

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

function SearchBar({
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


// ============ Start SearchBar ============
const SearchBar = ({ showButton = true, textInButton, children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(cardBadgeData);


    const handleSearchChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        <Stack gap={4}>
            <Box sx={{ flexGrow: 1, marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Search
                    sx={{
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

                {showButton && (
                    <Link to="/management/badges/badgecreation">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.customColors.white,
                                borderRadius: theme.customShape.btn,
                                textTransform: "none",
                                marginTop: { xs: theme.spacing(2), sm: 0 },
                                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                                padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1, 3) },
                                width: { xs: "100%", sm: "auto" },
                                boxShadow: theme.customShadows.default,
                                fontWeight: theme.fontWeight.bold,
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
}
export default SearchBar;
// ============ End SearchBar ============