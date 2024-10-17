// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import AnBSchoolLogo from "../../assets/images/AnBSchoolLogo.svg";
import DashboardContainer from "../../components/styles/DashboardContainer";
import InviteIssuerPage from "./InviteIssuerPage";
import TableIssuer from "./TableIssuer";
import PageTitle from "../../components/PageTitle";

const IssuerManagement = () => {
    return (
        <DashboardContainer>
            {/* <InviteIssuerPage /> */}
            <PageTitle
                title="Issuer Managements"
                subtitle="Manage issuer accounts, invite new issuers, and track their statuses all in one place."
            />
            <TableIssuer/>
        </DashboardContainer>
    );
};

export default IssuerManagement;
