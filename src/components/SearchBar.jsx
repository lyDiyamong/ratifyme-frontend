// MUI import
import { useState } from "react"; // Make sure to import useState from React
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

// Custom import
import theme from "../assets/themes";
import DashboardContainer from "./styles/DashboardContainer";
import cardBadgeData from "../data/CardBadgeData"; // Make sure this is the correct path

// Styled components
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.customShape.input,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
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

// Styled component for the wrapper containing the search icon to ensures the icon is centered and positioned correctly inside the search form
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

// Styled component for the input base used within the search bar
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

export default function SearchBar({ showButton = true, textInButton }) {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredData, setFilteredData] = useState(cardBadgeData); // Filtered data state

    // Handle input changes and filter data
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query); // Update the search query state
        console.log("Search Query:", query); // Debugging: Log the query

        const filtered = cardBadgeData.filter(
            (item) =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
        );
        console.log("Filtered Data:", filtered); // Debugging: Log the filtered data
        setFilteredData(filtered); // Update the filtered data
    };

      // ============ Start of search bar component ============
    return (
        <DashboardContainer>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    sx={{
                        backgroundColor: theme.palette.customColors.white,
                        color: theme.palette.text.primary,
                        borderRadius: theme.customShape.card,
                        padding: theme.spacing(1, 2),
                        boxShadow: theme.customShadows.default,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Toolbar
                        sx={{
                            flex: 1,
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Search bar */}
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
                                placeholder="Search for Badges..."
                                inputProps={{ "aria-label": "search" }}
                                value={searchQuery} // Bind the searchQuery state to the input value
                                onChange={handleSearchChange} // Handle input changes
                            />
                        </Search>

                        {/* Conditionally render the button */}
                        {showButton && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.light,
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "none",
                                    marginTop: { xs: theme.spacing(2), sm: 0 },
                                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                                    padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1, 3) },
                                    width: { xs: "100%", sm: "auto" },
                                    boxShadow: theme.customShadows.default,
                                }}
                            >
                                {textInButton}
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>

                {/* Render filtered cards */}
                <Box sx={{ mt: 2 }}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Box key={item.id} sx={{ mb: 2, border: "1px solid #ddd", p: 2 }}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </Box>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </Box>
            </Box>
        </DashboardContainer>

        // ============ End of search bar component ============
    );
}
