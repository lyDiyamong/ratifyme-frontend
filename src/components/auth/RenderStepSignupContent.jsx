// Custom import
import GeneralInfoFields from "./GeneralInfoFields";
import AddressFields from "./AddressFields";
import InstitutionInfoFields from "./InstitutionInfoFields";
import AccountSetupFields from "./AccountSetupFields";
import PasswordSetupFields from "./PasswordSetupFields";

const RenderStepSignupContent = ({ step, control, role, guest, watch, errors }) => {

    switch (step) {
        case 0:
            return <GeneralInfoFields control={control} errors={errors} watch={watch} />;
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
            ) : (
                <PasswordSetupFields control={control} role={role} guest={guest} watch={watch} />
            );
        case 4:
            return role === "institution" && <PasswordSetupFields control={control} role={role} guest={guest} watch={watch} />;
        default:
            return null;
    }
};

export default RenderStepSignupContent;
