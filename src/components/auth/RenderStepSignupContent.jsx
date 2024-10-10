import GeneralInfoFields from "./GeneralInfoFields";
import AddressFields from "./AddressFields";
import InstitutionInfoFields from "./InstitutionInfoFields";
import AccountSetupFields from "./AccountSetupFields";

const RenderStepSignupContent = ({ step, control, role, guest, watch }) => {
    switch (step) {
        case 0:
            return <GeneralInfoFields control={control} />;
        case 1:
            return <AddressFields control={control} />;
        case 2:
            return role === "institution" ? (
                <InstitutionInfoFields control={control} />
            ) : (
                <AccountSetupFields control={control} role={role} guest={guest} watch={watch} />
            );
        case 3:
            return role === "institution" ? (
                <AccountSetupFields control={control} role={role} guest={guest} watch={watch} />
            ) : null;
        default:
            return null;
    }
};

export default RenderStepSignupContent;
