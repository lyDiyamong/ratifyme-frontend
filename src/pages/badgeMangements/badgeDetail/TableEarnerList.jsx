// Reacl library import
import { useState } from "react";

// Custom import
import TableCustom from "../../../components/TableCustom";
import getSortOptions from "../../../components/GetSortOptions";
import FormatYear from "../../../utils/formatDate";

// API import
import { useFetchEmailEarnerQuery } from "../../../store/api/achievements/achievementApi";

const TableEarnerList = ({ achievementId }) => {
    const isSortable = true;
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("earnerName");
    const [sortOrder, setSortOrder] = useState("earnerName");
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
            selector: (row) => row.earnerName || "N/A",
        },
        {
            name: "Email",
            selector: (row) => row.Earners?.User?.email || "N/A",
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
        const newSortOrder = sortOrder === "-earnerName" ? "earnerName" : "earnerName";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    //Handle Searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // State for handling selected emails
    return (
        <TableCustom
            title="Earner List"
            data={earner?.data || []}
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
            sortOptions={getSortOptions("earnerName", "-earnerName")}
        />
    );
};

export default TableEarnerList;
