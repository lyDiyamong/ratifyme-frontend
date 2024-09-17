// React Library
import DataTable from "react-data-table-component";

// MUI Import
import { Box, Checkbox } from "@mui/material";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

// Custom Import
import MenuSelection from "./TableAction/MenuSelection";
import DashboardContainer from "./styles/DashboardContainer";
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

// ============ Start Table Custom Button ============ 
const TableCustom = ({ data = [], columns = [], sortIcon = false, actions = false, onActionClick = () => {} }) => {
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
        <DashboardContainer>
            <Box
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: theme.palette.customColors.white,
                    px: 2,
                    py: 2,
                }}
            >
                <DataTable
                    // DataTable Config
                    title="Earner List"
                    columns={dynamicColumns}
                    data={data}
                    pagination
                    selectableRowsComponent={Checkbox}
                    sortIcon={sortIcon && <ArrowDownward />}
                    dense
                    customStyles={customTable}
                />
            </Box>
        </DashboardContainer>
    );
};

export default TableCustom;

// ============ End Table Custom Button ============ 