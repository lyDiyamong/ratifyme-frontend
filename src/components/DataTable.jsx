// React Library import
import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// MUI import
import MUIDataTable from "mui-datatables";
import { Typography } from '@mui/material';

// Custom Import
import theme from "./../assets/themes/index";
import PropTypes from "prop-types";

// <!-- ============ Start Cached Component ============ -->
// Create cache instance for MUI DataTable styles
const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});
// <!-- ============ End Cached Component ============ -->

// <!-- ============ Start Configure Option for DataTable ============ -->
// Define default options for the MUIDataTable
const defaultOptions = {
    selectableRows: false,
    responsive: "scroll",
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    rowsPerPageOptions: [2, 4, 10],
    tableBodyHeight: "500px",
    tableBodyMaxHeight: "400px",
};
// <!-- ============ End Configure Option for DataTable ============ -->

// <!-- ============ Start Render DataTable ============ -->
// Define the DataTable component with config object as prop
const DataTable = ({ config, options = defaultOptions, title }) => {
  const { data, columns } = config; // Destructure data and columns from config

  // Convert data object to array of arrays for MUIDataTable
const formattedData = data.map((row, index) =>
        Object.values(row).map((cell, cellIndex) => (
            <Typography
                key={`cell-${index}-${cellIndex}`} // Add a unique key prop
                component="h5"
                sx={{
                fontSize: theme.typography.h5,
                }}
            >
                {cell}
            </Typography>
        ))
);
// <!-- ============ End Render DataTable ============ -->

// Modify column headers to render as h4 using Typography
const formattedColumns = columns.map((column, index) => ({
    name: column.name,
    label: (
        <Typography
        key={`column-${index}`} // Add a unique key prop
        component="h4"
        sx={{
            fontSize: theme.typography.h4,
            fontWeight: theme.fontWeight.bold,
        }}
    >
        {column.name}
        </Typography>
    ),
}));

return (
    <CacheProvider value={muiCache}>
        <MUIDataTable
        title={
            <Typography
            component="h3"
            sx={{
                fontSize: theme.typography.h3,
                fontWeight: theme.fontWeight.bold,
            }}
        >
            {title}
        </Typography>
        }
        data={formattedData}
        columns={formattedColumns}
        options={options}
    />
    </CacheProvider>
    );
};
// <!-- ============ End Render DataTable ============ -->

// Add PropTypes validation for props
DataTable.propTypes = {
config: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
    })
    ).isRequired,
}).isRequired,
options: PropTypes.object,
title: PropTypes.string.isRequired,
};

export default DataTable;