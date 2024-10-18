// React import
import { useNavigate } from "react-router";

// Mui import

// Custom import
import TableCustom from "../../components/TableCustomFront";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatDate from "../../utils/formatDate";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";

const BillingInvoiceManagement = () => {
    // Navigate hook
    const navigate = useNavigate();

    // Api fetching hook
    const { data: response, isLoading, isError, error } = useGetSubscritptionQuery();
    const subscriptions = response?.data;

    // Error custom hook
    const [message, setMessage] = useCatchStatus(isError || isError, error?.data?.message);

    // Handling view for another page
    const handleView = (institutionId) => {
        navigate(`/sales/invoice?institutionId=${institutionId}`);
    };

    // Data columns
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
                <TableCustom title="Billing and Invoice" data={subscriptions} columns={columns} />
            )}
        </DashboardContainer>
        // ============ End BillingInvoiceManagement ============
    );
};

export default BillingInvoiceManagement;
