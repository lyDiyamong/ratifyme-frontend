// React import
import { useLocation } from "react-router-dom";

// MUI import
import { Box, Typography, Skeleton } from "@mui/material";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableList";
import FormatDate from "../../utils/dateString";
import PageTitle from "../../components/PageTitle";

// API import
import { useGetSubInstitutionQuery } from "../../store/api/subscription/subscriptionApi";
import theme from "../../assets/themes";

const InvoiceManagement = () => {
    // Get query for requesting
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const institutionId = queryParams.get("institutionId");


    // Fetching data
    const { data: response, isLoading } = useGetSubInstitutionQuery(institutionId);
    const institutionData = response?.data;
    console.log(institutionData);


    // Total paid price
    const price = 0;
    const totalPaid = institutionData.reduce((accumulator, current) => {
        return accumulator + parseFloat(current.ServicePlan.price);
    }, price);

    console.log(totalPaid.toFixed(2));

    const columns = [
        {
            name: "Organization Name",
            selector: (row) => row.Institution?.institutionName,
            sortable: true,
        },
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

    return (
        // ============ Start login container ============
        <DashboardContainer>
            {/* Page Title */}
            <PageTitle title="Invoice" />

            {/* Table Data */}
            {<TableCustom title="Invoice" data={institutionData} columns={columns} />}

            {/* Start total price container */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    bgcolor: theme.palette.primary.main,
                    p: [4, 2],
                }}
            >
                <Box>
                    <Typography variant="h4" color={theme.palette.customColors.white}>
                        Total Paid : ${totalPaid.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            {/* End total price container */}
        </DashboardContainer>
        // ============ End login container ============
    );
};

export default InvoiceManagement;
