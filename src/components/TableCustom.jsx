// ============ Start TableCustom Component ============
// React library
import { useState } from "react";
import DataTable from "react-data-table-component";

// MUI imports
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
    useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { SearchOutlined } from "@mui/icons-material";

// Custom imports
import MenuSelection from "./TableAction/MenuSelection";
import theme from "../assets/themes/index";
import NoRecordData from "./NoRecordData";

// Custom styling for DataTable
const customTableStyles = {
    headCells: {
        style: {
            color: theme.palette.customColors.gray500,
            fontSize: "12px",
        },
    },
};

/**
 * TableCustom Component
 *
 * @param {string} [title=""] - Title of the table.
 * @param {Array} [data=[]] - Data to be displayed.
 * @param {Array} [columns=[]] - Column configurations.
 * @param {boolean} [sortIcon=false] - If true, shows a sort icon in the header.
 * @param {boolean} [actions=false] - If true, adds an "Action" column.
 * @param {function} [onSearch] - Function to handle search input.
 * @param {function} [onSortChange] - Function to handle sort change.
 * @param {boolean} [addNewBtn] - If true, display add button.
 * @param {function} [onAddNew] - Function to handle Add New button click.
 * @param {string} [addNewLabel="Add New"] - Custom label for the Add New button.
 * @param {number} [totalRows] - Total number of rows for pagination.
 * @param {number} [rowsPerPage] - Rows per page for pagination.
 * @param {function} [onPageChange] - Function to handle page change.
 * @param {function} [onRowsPerPageChange] - Function to handle rows per page change.
 * @param {Array} [sortOptions=[]] - List of options for sorting.
 * @returns {JSX.Element} - Rendered table with search, filter, and sort options.
 */

// =========== Start TableCustom ===========
const TableCustom = ({
    title = "",
    data = [],
    columns = [],
    sortIcon = false,
    actions = false,
    onAddNew = () => {},
    addNewLabel = "Add New",
    addNewBtn,
    onSearch = null,
    onSortChange = () => {},
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    totalRows = null,
    rowsPerPage = null,
    sortOptions = [],
    isSortable = false,
    sortColumn,
    sortOrder,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortValue, setSortValue] = useState("ASC");
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Default columns if not provided
    const defaultColumns = [
        { name: "ID", selector: (row) => row.id || "N/A", sortable: true },
        { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
        { name: "Email", selector: (row) => row.email || "N/A", sortable: true },
        { name: "Badge", selector: (row) => row.badge || "N/A", sortable: true },
        { name: "Year", selector: (row) => row.year || "N/A", sortable: true },
        { name: "Position", selector: (row) => row.position || "N/A", sortable: true },
    ];

    // Add an action column dynamically if enabled
    const dynamicColumns = actions
        ? [...(columns.length ? columns : defaultColumns), { name: "Action", cell: () => <MenuSelection /> }]
        : columns.length
        ? columns
        : defaultColumns;

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleSortChange = (value) => {
        setSortValue(value);
        onSortChange(value);
    };

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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography sx={{ fontSize: theme.typography.h3, fontWeight: theme.fontWeight.semiBold }}>{title}</Typography>
                    {/* Add Button for responsive  */}
                    {addNewBtn && (
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
                                justifyContent: isMobile ? "center" : "space-between",
                            }}
                        >
                            {!isMobile && addNewLabel}
                        </Button>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    {/* Search Bar */}
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search ..."
                        sx={{
                            flexGrow: 1,
                            minWidth: { md: "50px", sm: "150px" },
                            width: "70%" // 70% width on mobile
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {isSortable && (
                        <FormControl
                            sx={{
                                minWidth: { md: 160 },
                                width: "30%",
                            }}
                            size="small"
                            variant="outlined"
                        >
                            <InputLabel >Sort by</InputLabel>

                            <Select
                                value={sortValue}
                                label={window.innerWidth >= 300 ? "Sort by" : ""}
                                onChange={(e) => handleSortChange(e.target.value)}
                                displayEmpty
                                IconComponent={(props) => (
                                    <IconButton {...props} sx={{ padding: 0, display: { xs: "flex" } }}>
                                        <SwapVertIcon sx={{ fontSize: { md: "24px", xs: "20px" } }} />
                                    </IconButton>
                                )}
                            >
                                {sortOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{ fontSize: { md: 14, xs: 12 }, py: { xs: 1, sm: 1.5 } }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {/* Add New Button */}
                    {addNewBtn && (
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={onAddNew}
                            sx={{
                                display: { xss: "none", md: "flex" },
                                color: theme.palette.customColors.white,
                                fontWeight: theme.fontWeight.semiBold,
                                borderRadius: theme.customShape.btn,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            {addNewLabel}
                        </Button>
                    )}
                </Box>
            </Box>
            <DataTable
                columns={dynamicColumns}
                data={data}
                defaultSortFieldId={1}
                sortDirection={sortOrder === "name" ? "asc" : "desc"}
                onSort={(column) => {
                    if (onSortChange) {
                        onSortChange(column.selector);
                    }
                }}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationRowsPerPageOptions={[10, 15, 20, 30, 40, 50]}
                paginationPerPage={rowsPerPage}
                onChangePage={onPageChange}
                onChangeRowsPerPage={onRowsPerPageChange}
                customStyles={customTableStyles}
                responsive
                highlightOnHover
                striped
                searchQuery={searchQuery}
            />
            {data.length === 0 && <NoRecordData />}
        </Box>
    );
};

export default TableCustom;
// ============ End TableCustom Component ============
