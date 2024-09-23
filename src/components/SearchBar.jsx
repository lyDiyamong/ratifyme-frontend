import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

// Custom import
import theme from "../assets/themes";
import DashboardContainer from "./styles/DashboardContainer";
import cardBadgeData from "../data/CardBadgeData";

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

export default function SearchBar({ showButton = true, textInButton, children }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(cardBadgeData);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = cardBadgeData.filter(
            (item) => item.title.toLowerCase().includes(query) || item.institution.toLowerCase().includes(query),
        );
        setFilteredData(filtered);
    };

    return (
        <Stack gap={4}>
            <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
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
                                value={searchQuery}
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
                    </Toolbar>
                </AppBar>
            </Box>
            <DashboardContainer
                sx={{
                    backgroundColor: theme.palette.customColors.white,
                    borderRadius: theme.customShape.section,
                    border: theme.palette.cardBorder,
                    boxShadow: theme.customShadows.default,
                }}
            >
                {children}
            </DashboardContainer>
        </Stack>
    );
}
