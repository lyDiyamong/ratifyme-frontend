// React import
import { useNavigate } from "react-router";

// Mui import

// Custom import
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatDate from "../../utils/dateString";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SkeletonLoading from "../../components/loading/SkeletonLoading";

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";
import MakeSureModal from "../../components/MakeSureModal";
import { Button } from "@mui/material";
import theme from "../../assets/themes";

const BillingInvoiceManagement = () => {
    const navigate = useNavigate();
    const { data: response, isLoading, isError } = useGetSubscritptionQuery();
    const subscriptions = response?.data;

    const handleView = (institutionId) => {
        navigate(`/sales/invoice?institutionId=${institutionId}`);
    };

    const columns = [
        {
            name: "Organization Name",
            selector: (row) => row.Institution?.institutionName,
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row.Institution?.institutionEmail,
            sortable: true,
        },
        {
            name: "Subscription Plan",
            selector: (row) => row.ServicePlan?.name,
            sortable: true,
        },
        {
            name: "Plan expired Date",
            selector: (row) => FormatDate(row.endDate),
            sortable: true,
        },
        {
            name: "Action",
            selector: ({ institutionId }) => <MenuSelection onView={() => handleView(institutionId)} />,
        },
    ];

    return (
        // ============ Start BillingInvoiceManagement ============
        <DashboardContainer>
            {/* Page title */}
            <PageTitle title="Billing and Invoice" />
            {isLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                // Billing and Invoice Table
                <TableCustom title="Billing and Invoice" data={subscriptions} columns={columns} />
            )}
        </DashboardContainer>
        // ============ End BillingInvoiceManagement ============
    );
};

export default BillingInvoiceManagement;
