// React import
import { useNavigate } from "react-router";

// Mui import

// Custom import
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatDate from "../../utils/dateString";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";

// Api import
import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";

const BillingInvoiceManagement = () => {
    const navigate = useNavigate();
    const { data: response, isLoading, isError } = useGetSubscritptionQuery();
    const subscriptions = response?.data;
    console.log(subscriptions);

    const handleView = (institutionId) => {
        navigate(`/sales/invoice?institutionId=${institutionId}`);
    };

    const handleDelete = () => {
        console.log("Delete action triggered");
    };

    const columns = [
        {
            name: "Organization Name",
            selector: (row) => row.Institution?.name,
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row.Institution?.email,
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
            selector: ({ institutionId }) => (
                <MenuSelection onView={() => handleView(institutionId)} onDelete={handleDelete} />
            ),
        },
    ];

    return (
        <DashboardContainer>
            <PageTitle title="Billing and Invoice" />
            <TableCustom title="Billing and Invoice" data={subscriptions} columns={columns} />
        </DashboardContainer>
    );
};

export default BillingInvoiceManagement;
