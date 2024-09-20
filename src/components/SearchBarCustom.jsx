// import { useState } from "react";
// import { styled, alpha } from "@mui/material/styles";
// import { AppBar, Box, Toolbar, InputBase } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// // Styled components
// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.black, 0.15),
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//         width: "60%",
//     },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//         padding: theme.spacing(1, 1, 1, 0),
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create("width"),
//         width: "100%",
//         [theme.breakpoints.up("sm")]: {
//             width: "20ch",
//         },
//     },
// }));

// const SearchBar = ({ onSearch }) => {
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleSearchChange = (event) => {
//         const query = event.target.value.toLowerCase();
//         setSearchQuery(query);
//         if (onSearch) {
//             onSearch(query);
//         }
//     };

//     return (
//         <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#fff", padding: "8px", boxShadow: "none" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Search>
//                         <SearchIconWrapper>
//                             <SearchIcon />
//                         </SearchIconWrapper>
//                         <StyledInputBase
//                             placeholder="Search..."
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             inputProps={{ "aria-label": "search" }}
//                         />
//                     </Search>
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     );
// };

// export default SearchBar;

import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../assets/themes";

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

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
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
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default SearchBar;
