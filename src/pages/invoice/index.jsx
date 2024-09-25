// React import
import { useLocation } from "react-router-dom";

// MUI import
import { Box, Typography } from "@mui/material";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableList";
import FormatDate from "../../utils/formatDate";
import PageTitle from "../../components/PageTitle";

// API import
import { useGetSubInstitutionQuery } from "../../store/api/subscription/subscriptionApi";
import theme from "../../assets/themes";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";

const InvoiceManagement = () => {
    // Get query for requesting
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const institutionId = queryParams.get("institutionId");

    // Fetching data
    const { data: response, isLoading, isError } = useGetSubInstitutionQuery(institutionId);
    const institutionData = response?.data;

    // Total paid price
    const price = 0;
    const totalPaid =
        response &&
        institutionData.reduce((accumulator, current) => {
            return accumulator + parseFloat(current.ServicePlan.price);
        }, price);

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
            {isError && <AlertMessage variant="error" >Error fetching data</AlertMessage>}
            {/* Page Title */}
            <PageTitle title="Invoice" />
            {/* <AlertMessage variant="error">Login succesfully</AlertMessage> */}

            {/* Table Data */}
            {isLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                <TableCustom title="Invoice" data={institutionData} columns={columns}></TableCustom>
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
                        Total Paid : ${response && totalPaid.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            {/* Start total price container */}

            {/* End total price container */}
        </DashboardContainer>
        // ============ End login container ============
    );
};

export default InvoiceManagement;
