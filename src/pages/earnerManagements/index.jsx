import React from "react";
import TableCustom from "../../components/DataTable";
import { Box } from "@mui/material";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";
import FormatYear from "../../utils/dateFormat";
import MenuSelection from "../../components/MenuSelection";

const EarnerManagement = () => {
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const earnerData = response?.data;

    const handleView = () => {
        console.log('View action triggered');
      };
      
      const handleDelete = () => {
        console.log('Delete action triggered');
      };

    const earnerColumns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.User.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.User.email,
            sortable: true,
        },
        {
            name: "Badge",
            selector: (row) => row.Achievement.BadgeClass.name,
            sortable: true,
        },
        {
            name: "Academic Year",
            selector: (row) => <FormatYear dateString={row.AcademicBackground.academicYear}/>,
            sortable: true,
        },
        {
            name: "Action",
            selector: () => <MenuSelection onView={handleView} onDelete={handleDelete}/>
        }
    ];
    return (
        
        <Box>
            <TableCustom data={earnerData} columns={earnerColumns} />    
        </Box>
    );
};

export default EarnerManagement;
