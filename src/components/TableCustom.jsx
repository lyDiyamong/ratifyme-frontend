// React Library
import DataTable from "react-data-table-component";
import { useState } from "react";
// MUI Imports
import {
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
// Custom Imports
import MenuSelection from "./TableAction/MenuSelection";
import theme from "../assets/themes/index";
import AddIcon from "@mui/icons-material/Add";
import { SearchOutlined } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

// Custom styling for DataTable
const customTableStyles = {
    headCells: {
        style: {
            color: theme.palette.customColors.gray500,
            fontSize: "12px",
        },
    },
};


const TableCustom = ({
    title = "",
    data = [],
    columns = [],
    actions = false,
    // onSearch = () => {},
    onFilterChange = () => {},
    onSortChange = () => {},
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    onAddNew = () => {},
    addNewLabel = "Add New",
    totalRows,
    rowsPerPage,
    onSearch,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const defaultColumns = [
        { name: "ID", selector: (row) => row.id || "N/A", sortable: true },
        { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
        { name: "Email", selector: (row) => row.email || "N/A", sortable: true },
        { name: "Badge", selector: (row) => row.badge || "N/A", sortable: true },
        { name: "Year", selector: (row) => row.year || "N/A", sortable: true },
        { name: "Position", selector: (row) => row.position || "N/A", sortable: true },
    ];

    const dynamicColumns = actions
        ? [...(columns.length ? columns : defaultColumns), { name: "Action", cell: () => <MenuSelection /> }]
        : columns.length
        ? columns
        : defaultColumns;

    return (
        <Box
            component="section"
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.section,
                bgcolor: theme.palette.customColors.white,
                px: 4,
                py: 4,
                mt: 4,
            }}
        >
            <Box sx={{ display: { sm: "block", md: "flex" }, justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center", mb: 3 }}>
                    <Typography sx={{ fontSize: theme.typography.h3, fontWeight: theme.fontWeight.semiBold }}>
                        {title}
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        onClick={onAddNew}
                        sx={{
                            display: { md: "none", sm: "flex" },
                            color: theme.palette.customColors.white,
                            fontWeight: theme.fontWeight.semiBold,
                            borderRadius: theme.customShape.btn,
                            textTransform: "none",
                        }}
                    >
                        {addNewLabel}
                    </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    {/* Search Bar */}
                    <TextField
                        onSearch={handleSearch}
                        variant="outlined"
                        size="small"
                        placeholder="Search ..."
                        sx={{ flexGrow: 1, minWidth: { md: "250px", sm: "150px" } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => onSearch(e.target.value)}
                    />

                    <FormControl sx={{ minWidth: { md: 100, sm: 80, xs: 60 } }} size="small">
                        <InputLabel>
                            <IconButton sx={{ display: { md: "none", sm: "flex" } }}>
                                <SwapVertIcon sx={{ fontSize: "24px" }} />
                            </IconButton>
                            Sort by
                        </InputLabel>
                        <Select label="Sort by" onChange={(e) => onSortChange(e.target.value)}>
                            <MenuItem value="name">Name asc</MenuItem>
                            <MenuItem value="-name">Name Decs</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        onClick={onAddNew}
                        sx={{
                            display: { md: "flex", sm: "none" },
                            color: theme.palette.customColors.white,
                            fontWeight: theme.fontWeight.semiBold,
                            borderRadius: theme.customShape.btn,
                            textTransform: "none",
                            width: "100%",
                        }}
                    >
                        {addNewLabel}
                    </Button>
                </Box>
            </Box>
            <DataTable
                columns={dynamicColumns}
                data={data}
                defaultSortFieldId={1}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationPerPage={rowsPerPage}
                onChangePage={onPageChange}
                onChangeRowsPerPage={onRowsPerPageChange}
                customStyles={customTableStyles}
                responsive
                highlightOnHover
                striped
                searchQuery={searchQuery}
            />
        </Box>
    );
};

export default TableCustom;
