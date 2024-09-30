// React import
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Custom import
import AlertMessage from "../../components/alert/AlertMessage";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableCustom from "../../components/TableCustom";
import MenuSelection from "../../components/TableAction/MenuSelection";
import FormatDate from "../../utils/formatDate";

// Api import
import { useGetInstitutionQuery } from "../../store/api/institutionManagement/institutionApi";

const InstitutionManagement = () => {
    // Fetching institutions hook
    const { data: response, isLoading, isError, error } = useGetInstitutionQuery();
    const institutions = response?.data;
    // Navigate hook
    const navigate = useNavigate();

    // Error state hook
    const [errorMessage, setErrorMessage] = useState("");
    console.log(institutions);

    // View institution profiles
    const handleView = (institutionId) => {
        navigate(`/management/institutions/${institutionId}`);
    };

    const columns = [
        {
            name: "Organization Name",
            selector: (row) => row?.institutionName || "N/A",
            sortable: true,
        },
        {
            name: "Email Address",
            selector: (row) => row?.institutionEmail || "N/A",
            sortable: true,
        },
        {
            name: "Code",
            selector: (row) => row?.code || "N/A",
            sortable: true,
        },
        {
            name: "Register Date",
            selector: (row) => FormatDate(row?.createdAt),
            sortable: true,
        },
        {
            name: "Action",
            selector: ({ id }) => <MenuSelection onView={() => handleView(id)} />,
        },
    ];

    // Error handling
    useEffect(() => {
        if (isError && error?.data?.message) {
            setErrorMessage(error.data.message);
        }
    }, [isError, error]);
    
    return (
        // ============ Start InstitutionManagement ============
        <DashboardContainer>
            {isError && <AlertMessage variant="error">{errorMessage}</AlertMessage>}
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
