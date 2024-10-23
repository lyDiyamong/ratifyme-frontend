import TableCustom from "../../../components/TableCustom";
import { useFetchEmailEarnerQuery } from "../../../store/api/achievements/achievementApi";
import FormatYear from "../../../utils/formatDate";
import { useState } from "react";
import getSortOptions from "../../../components/GetSortOptions"

const TableEarnerList = ({ achievementId }) => {
    const isSortable = true;
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: earner } = useFetchEmailEarnerQuery({
        achievementId: achievementId,
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });

    const earnerColumns = [
        {
            name: "No.",
            selector: (row, index) => index + 1 || "N/A",    
        },
        {
            name: "Name",
            selector: (row) => row.name || "N/A",   
        },
        {
            name: "Email",
            selector: (row) => row.User?.email || "N/A",     
        },
        {
            name: "Date Of Birth",
            selector: (row) => FormatYear(row.User?.dateOfBirth) || "N/A",   
        },
        {
            name: "Academic Year",
            selector: (row) => FormatYear(row.AcademicBackground?.academicYear) || "N/A",
        },
    ];
    //handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    //Handle rows per page
    const handleRowsPerPageChange = (newLimit) => {
        setRowsPerPage(newLimit);
    };

    //Handle sorting change
    const handleSortChange = (column) => {
        const newSortOrder = sortOrder === "-name" ? "name" : "name";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    //Handle Searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // State for handling selected emails
    const earners = earner?.data.map((earner) => earner?.Earner);
    return (
        <TableCustom
            title="Earner List"
            data={earners}
            columns={earnerColumns}
            pagination
            totalRows={earner?.total || 0}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            isSortable={isSortable}
            onSortChange={handleSortChange}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            onSearch={handleSearch}
            addNewBtn={false}
            sortOptions={getSortOptions("name", "-name")}
        ></TableCustom>
    )
};

export default TableEarnerList;
