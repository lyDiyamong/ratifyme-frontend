// React import
import { useState } from "react";
import { useNavigate } from "react-router";

// Mui import

// Custom import
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatDate from "../../utils/formatDate";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import AlertMessage from "../../components/alert/AlertMessage";

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";


const BillingInvoiceManagement = () => {
    // Error state hook
    const [errorMessage, setErrorMessage] = useState("");

    // Navigate hook
    const navigate = useNavigate();

    // Api fetching hook
    const { data: response, isLoading, isError } = useGetSubscritptionQuery();
    const subscriptions = response?.data;

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

    // Error handling
    if (isError) {
        setErrorMessage("There was an error fetching subscription data. Please try again later.");
    }

    return (
        // ============ Start BillingInvoiceManagement ============
        <DashboardContainer>
            {errorMessage && <AlertMessage variant="error">{errorMessage}</AlertMessage>}
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
