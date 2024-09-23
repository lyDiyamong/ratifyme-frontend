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

const BillingInvoiceManagement = () => {
    const navigate = useNavigate();
    const { data: response, isLoading, isError } = useGetSubscritptionQuery();
    const subscriptions = response?.data;
    console.log(subscriptions);

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
            selector: ({ institutionId }) => (
                <MenuSelection onView={() => handleView(institutionId)} />
            ),
        },
    ];

    return (
        <DashboardContainer>
            <PageTitle title="Billing and Invoice" />
            {isLoading ? <SkeletonLoading num={5} /> :<TableCustom title="Billing and Invoice" data={subscriptions} columns={columns} />}
        </DashboardContainer>
    );
};

export default BillingInvoiceManagement;
