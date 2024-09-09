// React Library import
import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// MUI import
import MUIDataTable from "mui-datatables";

// <!-- ============ Start Cache ============ -->
// Create cache instance for MUI DataTable styles
const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});
// <!-- ============ End Cache ============ -->

// <!-- ============ Start Config Optiob for DataTable ============ -->
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
// <!-- ============ End Config Optiob for DataTable ============ -->

// <!-- ============ Start DataTable ============ -->
// Define the DataTable component with config object as prop
const DataTable = ({ config, options = defaultOptions,title }) => {
    const { data, columns } = config; // Destructure data and columns from config

    // Convert data object to array of arrays for MUIDataTable
    const formattedData = data.map(row => Object.values(row));

    // Convert columns object to array of strings for MUIDataTable
    const formattedColumns = columns.map(column => column.name);

    return (
        <CacheProvider value={muiCache}>
            <MUIDataTable
                title={title}
                data={formattedData}
                columns={formattedColumns}
                options={options}
            />
        </CacheProvider>
    );
};
// <!-- ============ End DataTable ============ -->

export default DataTable;


// Usage

// 1.import DataTable from "../../components/DataTable";
// 2.Configt listDB for data detail
// 3.import
// 3.call tage <DataTable title={"title" config={listDB}}/>

// Sample
// const listDB = {
//     data: [
//         {   Id:         1,
//             Name:       "Srey Pov",
//             img:        "",
//             Email:      "sreypov@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         2,
//             Name:       "Rotha",
//             img:        "",
//             Email:      "rotha@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete"
//         },
//         {   Id:         3,
//             Name:       "Ratanak",
//             img:        "",
//             Email:      "ratanak@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         4,
//             Name:       "Ya Mong",
//             img:        "",
//             Email:      "yamong@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         5,
//             Name:       "Malen",
//             img:        "",
//             Email:      "malen@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         6,
//             Name:       "lyhour",
//             img:        "",
//             Email:      "lyhour@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         7,
//             Name:       "bongthong",
//             img:        "",
//             Email:      "bongthong@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//         {   Id:         8,
//             Name:       "chhunan",
//             img:        "",
//             Email:      "chhunan@mail.com",
//             Badge:      "Fullstack",
//             DOB:        "01/01/01",
//             Position:   "Student",
//             Action:     "View/Delete",
//         },
//     ],
//     columns: [
//         {   name:       "ID"},
//         {   name:       "Name" },
//         {   name:        "Image"},
//         {   name:       "Email" },
//         {   name:       "Badge" },
//         {   name:       "Date of Birth" },
//         {   name:       "Position" },
//         {   name:       "Action" },
//     ]
// };
// <DataTable title={"Earner List"} config={listDB} />