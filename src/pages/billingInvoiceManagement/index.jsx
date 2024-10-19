// React import
import { useNavigate } from "react-router";
import { useState } from "react";

// Mui import

// Custom import
import TableCustom from "../../components/TableCustom";
import MenuSelection from "../../components/TableAction/MenuSelection";
// import FormatDate from "../../utils/formatDate";
import FormatYear from "../../utils/formatDate";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";
import NoRecordData from "../../components/NoRecordData";

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";

// ============ Start Table Earner Modal ============
const BillingInvoiceManagement = () => {
    // Navigate hook
    const navigate = useNavigate();

    // Pagination & Sorting State & Limiting & Searching
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch data from the backend based on pagination, sorting, and search
    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useGetSubscritptionQuery({
        page: currentPage,
        limit: rowsPerPage,
        sort: sortColumn,
        order: sortOrder,
        search: searchQuery,
    });
    console.log("API Response:", response);
    const subscriptions = response?.data;

    // Error custom hook
    const [message, setMessage] = useCatchStatus(isError || isError, error?.data?.message);

    // Handling view for another page
    const handleView = (institutionId) => {
        navigate(`/sales/invoice?institutionId=${institutionId}`);
    };

    // Data columns
    const subscriptionColumns = [
        {
            name: "No.",
            selector: (row, index) => index + 1 || "N/A",
        },
        {
            name: "Organization Name",
            selector: (row) => row?.name || "N/A",
        },
        {
            name: "Email Address",
            selector: (row) => row.Institution?.institutionEmail || "N/A",
        },
        {
            name: "Subscription Plan",
            selector: (row) => row.ServicePlan?.name || "N/A",
        },
        {
            name: "Plan expired Date",
            selector: (row) => FormatYear(row.endDate) || "N/A",
        },
        {
            name: "Action",
            selector: ({ institutionId }) => <MenuSelection onView={() => handleView(institutionId)} />,
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
        const newSortOrder = sortOrder === "-name" ? "name" : "-name";
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    // Handle searching
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        // ============ Start BillingInvoiceManagement ============
        <DashboardContainer>
            {message && (
                <AlertMessage variant="error" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            {/* Page title */}
            <PageTitle title="Billing and Invoice" />
            {isLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                // Billing and Invoice Table
                <TableCustom
                    title="Billing and Invoice"
                    data={subscriptions}
                    columns={subscriptionColumns}
                    pagination
                    totalRows={response?.total || 0}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onSearch={handleSearch}
                    sortOptions={[
                        { value: "name", label: "ASC ⬆" },
                        { value: "-name", label: "DES ⬇" },
                    ]}
                >
                    {subscriptions?.length === 0 && <NoRecordData />}
                </TableCustom>
            )}
        </DashboardContainer>
        // ============ End BillingInvoiceManagement ============
    );
};

export default BillingInvoiceManagement;
// ============ End Table Earner Modal ============
