import React from "react";
import TableCustom from "../../components/DataTable";
import { Box } from "@mui/material";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";
import FormatYear from "../../utils/dateFormat";

const EarnerManagement = () => {
    const { data: response, isLoading, isError } = useFetchEarnerQuery();
    const earnerData = response?.data;
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
    ];
    return (
        <Box>
            <TableCustom data={earnerData} columns={earnerColumns} actions />
        </Box>
    );
};

export default EarnerManagement;
