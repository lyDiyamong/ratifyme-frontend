// React Library
import DataTable from "react-data-table-component";

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

/**
 * TableCustom Component
 *
 * @param {string} [title=""] - Title of the table.
 * @param {Array} [data=[]] - Data to be displayed.
 * @param {Array} [columns=[]] - Column configurations.
 * @param {boolean} [sortIcon=false] - If true, shows a sort icon in the header.
 * @param {boolean} [actions=false] - If true, adds an "Action" column.
 * @param {function} [onSearch] - Function to handle search input.
 * @param {function} [onFilterChange] - Function to handle filter change.
 * @param {function} [onSortChange] - Function to handle sort change.
 * @param {function} [onAddNew] - Function to handle Add New button click.
 * @param {string} [addNewLabel="Add New"] - Custom label for the Add New button.
 * @returns {JSX.Element} - Rendered table with search, filter, and sort options.
 */

// =========== Start TableCustom ===========
const TableCustom = ({
    title = "",
    data = [],
    columns = [],
    actions = false,
    onSortChange = () => {},
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    onAddNew = () => {},
    addNewLabel = "Add New",
    totalRows = null,
    rowsPerPage = null,
    onSearch = null,
    sortOptions = [],
}) => {
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
                    {/* Add Button for responsive  */}
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
                        // onSearch={handleSearch}
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
    {/* Sort By */}
    <FormControl sx={{ minWidth: { md: 100, sm: 80, xs: 60 } }} size="small">
                        <InputLabel>
                            <IconButton sx={{ display: { md: "none", sm: "flex" } }}>
                                <SwapVertIcon sx={{ fontSize: "24px" }} />
                            </IconButton>
                            Sort by
                        </InputLabel>
                        <Select label="Sort by" onChange={(e) => onSortChange(e.target.value)}>
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value} sx={{ fontSize: 14 }}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Add New Button */}
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
                paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 40, 50]}
                paginationPerPage={rowsPerPage}
                onChangePage={onPageChange}
                onChangeRowsPerPage={onRowsPerPageChange}
                customStyles={customTableStyles}
                responsive
                highlightOnHover
                striped
            />
        </Box>
    );
};

export default TableCustom;
// =========== End TableCustom ===========