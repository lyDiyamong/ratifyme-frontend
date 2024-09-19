// React import
import { useLocation } from "react-router-dom";

// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableList";
import FormatDate from "../../utils/dateString";
import PageTitle from "../../components/PageTitle";
import MenuSelection from "../../components/TableAction/MenuSelection";

// API import
import { useGetSubInstitutionQuery } from "../../store/api/subscription/subscriptionApi";

const InvoiceManagement = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const institutionId = queryParams.get("institutionId");


    const { data: response } = useGetSubInstitutionQuery(institutionId);

    const institutionData = response?.data

    const handleView = () => {
        console.log("View action triggered");
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
        {
            name: "Action",
            selector: ({ institutionId }) => (
                <MenuSelection onView={() => handleView(institutionId)} onDelete={handleDelete} />
            ),
        },
    ];

    return (
        <DashboardContainer>
            <PageTitle title="Invoice" />
            <TableCustom title="Invoice" data={institutionData} columns={columns} />
            {/* <TableCustom title="Billing and Invoice" data={institutionData} columns={columnss} /> */}
        </DashboardContainer>
    );
};

export default InvoiceManagement;
