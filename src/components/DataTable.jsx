import React from "react";
import DataTable from "react-data-table-component";
import { Box, IconButton, Stack, Checkbox } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import DashboardContainer from "./styles/DashboardContainer";
import theme from "./../assets/themes/index";

// Custom styling for DataTable
const customStyle = {
    headCells: {
        style: {
            color: theme.palette.customColors.gray500,
            fontSize: "12px",
        },
    },
};

// Action buttons for the table
const ActionButtons = ({ onActionClick }) => {
    return (
        <Stack direction="row" spacing={2}>
            <IconButton onClick={() => onActionClick("view")} aria-label="view">
                <VisibilityIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
            <IconButton onClick={() => onActionClick("delete")} aria-label="delete">
                <DeleteForeverIcon sx={{ color: theme.palette.customColors.red400 }} />
            </IconButton>
        </Stack>
    );
};

/**
 * EarnerDataTable Component
 * @param {Array} data - Data to display in the table
 * @param {Array} columns - Column configurations
 * @param {boolean} sortIcon - Show or hide sort icon
 * @param {boolean} actions - Enable or disable action buttons
 * @param {function} onActionClick - Function to handle action button clicks
 * @returns {JSX.Element}
 */
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
                  cell: () => <ActionButtons onActionClick={onActionClick} />,
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
                    customStyles={customStyle}
                />
            </Box>
        </DashboardContainer>
    );
};

export default TableCustom;
