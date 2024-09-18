import { useGetSubscritptionQuery } from "../../store/api/subscription/subscriptionApi";

// Mui import
import { Box } from "@mui/material";

// Custom import
import TableCustom from "../../components/DataTable";
import MenuSelection from "../../components/MenuSelection";
import FormatDate from "../../utils/dateString";
import DashboardContainer from "../../components/styles/DashboardContainer";
import PageTitle from "../../components/PageTitle";

const BillingInvoiceManagement = () => {
    const { data : response, isLoading, isError } = useGetSubscritptionQuery();
    const subscriptions = response?.data;
    console.log(subscriptions);

    const handleView = () => {
        console.log("View action triggered");
    };

    const handleDelete = () => {
        console.log("Delete action triggered");
    };

    const defaultColumns = [
        {
            name: "Organization Name",
            selector: (row) => row.Institution.name,
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row.Institution.email,
            sortable: true,
        },
        {
            name: "Plan expired Date",
            selector: (row) => FormatDate(row.endDate),
            sortable: true,
        },
        {
            name: "Action",
            selector: () => <MenuSelection onView={handleView} onDelete={handleDelete} />,
        },
    ];

    return (
        <DashboardContainer>
            <PageTitle title="Billing and Invoice " />
            <TableCustom data={subscriptions} columns={defaultColumns} />
        </DashboardContainer>
    );
};

export default BillingInvoiceManagement;
