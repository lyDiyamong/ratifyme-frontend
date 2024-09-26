// React import
import { useNavigate } from "react-router";

// Custom import
import AlertMessage from "../../components/alert/AlertMessage";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableList";
import MenuSelection from "../../components/TableAction/MenuSelection";

// Api import
import { useGetInstitutionQuery } from "../../store/api/institutionManagement/institutionApi";

const InstitutionManagement = () => {
    const { data: response, isLoading, isError } = useGetInstitutionQuery();
    const navigate = useNavigate();
    const institutions = response?.data;
    console.log(institutions);

    const handleView = (institutionId) => {
        navigate(`/management/institutions/${institutionId}`)
    };

    const columns = [
        {
            name: "Organization Name",
            selector: (row) => row?.institutionName,
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row?.institutionEmail,
            sortable: true,
        },
        {
            name: "Action",
            selector: ({ id }) => <MenuSelection onView={() => handleView(id)} />,
        },
    ];
    return (
        // ============ Start InstitutionManagement ============
        <DashboardContainer>
            {isError && <AlertMessage variant="error">Error fetching data</AlertMessage>}
            {/* Page title */}
            <PageTitle title="Institution Management" />
            {isLoading ? (
                <SkeletonLoading num={5} />
            ) : (
                // Billing and Invoice Table
                <TableCustom title="Issuer List" data={institutions} columns={columns} />
            )}
        </DashboardContainer>
        // ============ End InstitutionManagement ============
    );
};

export default InstitutionManagement;
