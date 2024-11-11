// React lirary import
import { useNavigate } from "react-router";
import { useState } from "react";

// Custom import
import AlertMessage from "../../components/alert/AlertMessage";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableCustom";
import MenuSelection from "../../components/TableAction/MenuSelection";
import getSortOptions from "../../components/GetSortOptions";
import { TableAvatars } from "../../components/avartars/TableAvatars";
import FormatDate from "../../utils/formatDate";
import useCatchStatus from "../../hooks/useCatchStatus";

// Api import
import { useGetInstitutionQuery } from "../../store/api/institutionManagement/institutionApi";

const InstitutionManagement = () => {
    const isSortable = true;
    // Pagination & Sorting State & Limiting & Searching
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("institutionName");
    const [sortOrder, setSortOrder] = useState("institutionName");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetching institutions hook
    const {
        data: institutionsResponse,
        isLoading: institutionsLoading,
        isError: institutionsIsError,
        error: institutionsError,
    } = useGetInstitutionQuery({
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });

    const institutions = institutionsResponse?.data;
    // Navigate hook
    const navigate = useNavigate();

    // Error custom hook
    const [errorHandling, setErrorHandling] = useCatchStatus(institutionsIsError, institutionsError?.data?.message);

    // View institution profiles
    const handleView = (institutionId) => {
        navigate(`/dashboard/management/institutions/${institutionId}`);
    };

    const invoiceColumns = [
        {
            name: "No.",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1 || "N/A",
        },
        {
            name: "Organization Name",
            selector: (row) => <TableAvatars profileImage={row.institutionProfileImage} name={row.institutionName} />,
        },
        {
            name: "Email Address",
            selector: (row) => row?.institutionEmail || "N/A",
        },
        {
            name: "Code",
            selector: (row) => row?.code || "N/A",
        },
        {
            name: "Register Date",
            selector: (row) => FormatDate(row?.createdAt),
        },
        {
            name: "Action",
            selector: ({ id }) => <MenuSelection onView={() => handleView(id)} />,
        },
    ];

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handle rows per page change (limit)
    const handleRowsPerPageChange = (newLimit) => {
        setRowsPerPage(newLimit);
    };

    // Handle sorting change
    const handleSortChange = (column) => {
        const newSortOrder = sortOrder === "-institutionName" ? "institutionName" : "-institutionName";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    // Handle searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        // ============ Start InstitutionManagement ============
        <DashboardContainer>
            {errorHandling && (
                <AlertMessage variant="error" onClose={() => setErrorHandling("")}>
                    {errorHandling}
                </AlertMessage>
            )}
            {/* Page title */}
            <PageTitle title="Institution Management" />
            {institutionsLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                // Billing and Invoice Table
                <TableCustom
                    title="Institution List"
                    data={institutions}
                    columns={invoiceColumns}
                    pagination
                    addNewLabel="Invite Earner"
                    totalRows={institutionsResponse?.total || 0}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSearch={handleSearch}
                    isSortable={isSortable}
                    sortOptions={getSortOptions("institutionName", "-institutionName")}
                >
                </TableCustom>
            )}
        </DashboardContainer>
        // ============ End InstitutionManagement ============
    );
};

export default InstitutionManagement;
