// Custom import
import DashboardContainer from "../../components/styles/DashboardContainer";
import TableIssuer from "./TableIssuer";
import PageTitle from "../../components/PageTitle";

const IssuerManagement = () => {
    return (
        <DashboardContainer>
            <PageTitle
                title="Issuer Managements"
                subtitle="Manage issuer accounts, invite new issuers, and track their statuses all in one place."
            />
            <TableIssuer/>
        </DashboardContainer>
    );
};

export default IssuerManagement;
