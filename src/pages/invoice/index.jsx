// React import
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

// MUI import
import { Box, Typography } from "@mui/material";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableCustom";
import FormatDate from "../../utils/formatDate";
import PageTitle from "../../components/PageTitle";

// API import
import { useGetSubInstitutionQuery } from "../../store/api/subscription/subscriptionApi";
import theme from "../../assets/themes";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";

const InvoiceManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { roleId } = useSelector((state) => state.global);

    // Get query for requesting
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { institutionData } = useSelector((state) => state.global);

    const institutionId = institutionData?.id || queryParams.get("institutionId");

    // Fetching data
    const { data: response, isLoading, isError } = useGetSubInstitutionQuery(institutionId);
    const instiData = response?.data || [];

    // Filter data based on search query
    const filteredData = instiData.filter((invoice) => {
        const activeSubscription = invoice.status === true; // Ensure active subscription
        const organizationName = invoice.name?.toLowerCase() || "";
        const subscriptionPlan = invoice.ServicePlan?.name?.toLowerCase() || "";

        // Return true only if there's an active subscription and either name matches the search query
        return (
            activeSubscription &&
            (organizationName.includes(searchQuery.toLowerCase()) || subscriptionPlan.includes(searchQuery.toLowerCase()))
        );
    });

    // Total paid price
    const totalPaid = instiData.reduce((accumulator, current) => {
        return accumulator + parseFloat(current.ServicePlan?.price || 0);
    }, 0);

    // Invoice columns
    const invoiceColumns = [
        ...(roleId === 2
            ? []
            : [
                  {
                      name: "Organization Name",
                      selector: (row) => row.subscriptionName,
                      sortable: true,
                  },
              ]),
        {
            name: "Subscription Plan",
            selector: (row) => row.ServicePlan?.name,
            sortable: true,
        },
        {
            name: "Subscription Price",
            selector: (row) => row.ServicePlan?.price,
            sortable: true,
        },
        {
            name: "Plan Start Date",
            selector: (row) => FormatDate(row.startDate),
            sortable: true,
        },
        {
            name: "Plan Expiry Date",
            selector: (row) => FormatDate(row.endDate),
            sortable: true,
        },
    ];

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage);

    return (
        // ============ Start dashboard container ============
        <DashboardContainer>
            {isError && <AlertMessage variant="error">Error fetching data</AlertMessage>}
            {/* Page Title */}
            <PageTitle title="Total Invoice" />

            {/* Table Data */}
            {isLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                <TableCustom
                    title="Invoice"
                    data={paginatedData}
                    columns={invoiceColumns}
                    onSearch={setSearchQuery}
                    pagination
                    totalRows={instiData.length}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={(newRowsPerPage) => {
                        setRowsPerPage(newRowsPerPage);
                        setCurrentPage(1);
                    }}
                />
            )}
            <Box
                sx={{
                    width: "100%",
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    bgcolor: theme.palette.secondary.dark,
                    p: [4, 2],
                }}
            >
                <Box>
                    <Typography variant="h4" color={theme.palette.customColors.white}>
                        Total Paid: ${totalPaid.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            {/* Start total price container */}

            {/* End total price container */}
        </DashboardContainer>
        // ============ End dashboard container ============
    );
};

export default InvoiceManagement;
