// React Library
import DataTable from "react-data-table-component";

// MUI Import
import { Box, Checkbox } from "@mui/material";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

// Custom Import
import MenuSelection from "./TableAction/MenuSelection";
import theme from "../assets/themes/index";

/**
 * EarnerDataTable Component
 * @param {Array} data - Data to display in the table
 * @param {Array} columns - Column configurations
 * @param {boolean} sortIcon - Show or hide sort icon
 * @param {boolean} actions - Enable or disable action buttons
 * @param {function} onActionClick - Function to handle action button clicks
 * @returns {JSX.Element}
 */

// Custom styling for DataTable
const customTable = {
    headCells: {
        style: {
            color: theme.palette.customColors.gray500,
            fontSize: "12px",
        },
    },
};

/**
 *
 * @param {string} [title=""] - The title of the table. Displayed at the top of the table.
 * @param {Array} [data=[]] - The data to be displayed in the table. Each object in the array represents a row.
 * @param {Array} [columns=[]] - Column configurations for the table. If not provided, default columns are used.
 * @param {boolean} [sortIcon=false] - If true, shows a sort icon in the table header. Defaults to false.
 * @param {boolean} [actions=false] - If true, adds an "Action" column with buttons for actions like view or delete.
 * @returns {JSX.Element} A Material-UI styled DataTable component.
 */
// ============ Start Table Custom Button ============
const TableCustom = ({title='', data = [], columns = [], sortIcon = false, actions = false}) => {
    // Default columns if not provided
    const defaultColumns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Badge",
            selector: (row) => row.badge,
            sortable: true,
        },
        {
            name: "Year",
            selector: (row) => row.year,
            sortable: true,
        },
        {
            name: "Position",
            selector: (row) => row.position,
            sortable: true,
        },
    ];

    // Add an action column if enabled
    const dynamicColumns = actions
        ? [
              ...(columns.length > 0 ? columns : defaultColumns),
              {
                  name: "Action",
                  cell: () => <MenuSelection />,
              },
          ]
        : columns.length > 0
        ? columns
        : defaultColumns;

    return (
            <Box component="section"
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: theme.palette.customColors.white,
                    px: 2,
                    py: 2,
                    mt : 4
                }}
            >
                <DataTable
                    // DataTable Config
                    title={title}
                    columns={dynamicColumns}
                    data={data}
                    pagination
                    selectableRowsComponent={Checkbox}
                    sortIcon={sortIcon && <ArrowDownward />}
                    dense
                    customStyles={customTable}
                />
            </Box>
    );
};

export default TableCustom;

// ============ End Table Custom Button ============
