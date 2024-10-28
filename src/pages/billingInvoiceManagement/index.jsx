// React import
import { useNavigate } from "react-router";
import { useState } from "react";

// Mui import
import { Chip } from "@mui/material";

// // Custom import
import TableCustom from "../../components/TableCustom";
import FormatYear from "../../utils/formatDate";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";
import { TableAvatars } from "../../components/avartars/TableAvatars";
import theme from "../../assets/themes";
import getSortOptions from "../../components/GetSortOptions"

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";

// ============ Start Table Earner Modal ============
const BillingInvoiceManagement = () => {
    const isSortable = true;
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

    const subscriptionData = response?.data;

    // Error custom hook
    const [message, setMessage] = useCatchStatus(isError || isError, error?.data?.message);

    // Handling view for another page
    const handleView = (institutionId) => {
        navigate(`/dashboard/sales/invoice?institutionId=${institutionId}`);
    };

    // Data columns
    const subscriptionColumns = [
        {
            name: "No.",
            selector: (row, index) => index + 1 || "N/A",
        },
        {
            name: "Organization Name",
            selector: (row) => <TableAvatars profileImage={row.Institution?.institutionProfileImage} name={row.name} />,
        },
        {
            name: "Email Address",
            selector: (row) => row.Institution?.institutionEmail || "N/A",
        },
        {
            name: "Current Plan",
            selector: (row) => row.ServicePlan?.name || "N/A",
        },
        {
            name: "Plan expired Date",
            selector: (row) => FormatYear(row.endDate) || "N/A",
        },
        {
            name: "Action",
            selector: ({ institutionId }) => (
                <Chip
                    label="View"
                    clickable
                    sx={{ color: theme.palette.primary.dark, backgroundColor: theme.palette.primary.light }}
                    onClick={() => handleView(institutionId)}
                />
            ),
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
                    data={subscriptionData}
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
                    isSortable={isSortable}
                    sortOptions={getSortOptions("name", "-name")}
                >
                </TableCustom>
            )}
        </DashboardContainer>
        // ============ End BillingInvoiceManagement ============
    );
};

export default BillingInvoiceManagement;
// ============ End Table Earner Modal ============
