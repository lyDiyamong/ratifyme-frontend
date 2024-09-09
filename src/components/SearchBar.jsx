// MUI import
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

// Styled component for the search container
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.customShape.input,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        width: "60%", // Adjust width on medium screens
    },
    [theme.breakpoints.up("md")]: {
        width: "70%", // Adjust width on larger screens
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%", // Full width on small screens
        marginRight: theme.spacing(0), // No margin on small screens
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
            width: "25ch", // Increased width for more text on small screens
        },
        [theme.breakpoints.up("md")]: {
            width: "40ch", // Increased width for more text on medium screens
        },
        [theme.breakpoints.up("lg")]: {
            width: "70ch", // Further increased width for more text on large screens
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%", // Full width input field on small screens
        },
    },
}));

export default function SearchBar({ showButton = true, textInButton }) {
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
                        <Search sx={{ borderRadius: theme.customShape.input }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search for Badges..."
                                inputProps={{ "aria-label": "search" }}
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
                                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Adjust font size based on screen size
                                    padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1, 3) }, // Smaller padding on mobile
                                    width: { xs: "100%", sm: "auto" }, // Full width on mobile screens
                                    boxShadow: theme.customShadows.default,
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                {textInButton}
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </DashboardContainer>

    // ============ End of search bar component ============ 

    );
}
