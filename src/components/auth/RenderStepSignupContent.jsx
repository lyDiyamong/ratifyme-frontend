// Custom import
import GeneralInfoFields from "./GeneralInfoFields";
import AddressFields from "./AddressFields";
import InstitutionInfoFields from "./InstitutionInfoFields";
import AccountSetupFields from "./AccountSetupFields";
import PasswordSetupFields from "./PasswordSetupFields";

const RenderStepSignupContent = ({ step, control, role, guest, watch, errors, termOfUseError }) => {
    switch (step) {
        case 0:
            return role === "institution" ? (
                <InstitutionInfoFields control={control} watch={watch} />
            ) : (
                <GeneralInfoFields control={control} errors={errors} watch={watch} />
            );
        case 1:
            return role === "institution" ? (
                <GeneralInfoFields control={control} errors={errors} watch={watch} />
            ) : (
                <AddressFields control={control} />
            );
        case 2:
            return role === "institution" ? (
                <AddressFields control={control} />
            ) : (
                <AccountSetupFields control={control} role={role} guest={guest} watch={watch} />
            );
        case 3:
            return role === "institution" ? (
                <AccountSetupFields control={control} role={role} guest={guest} watch={watch} />
            ) : (
                <PasswordSetupFields control={control} role={role} guest={guest} watch={watch} />
            );
        // case 4:
        //     return role === "institution" && <PasswordSetupFields control={control} role={role} guest={guest} watch={watch} />;
        case 4:
            return (
                role === "institution" && (
                    <>
                        <PasswordSetupFields
                            control={control}
                            role={role}
                            guest={guest}
                            watch={watch}
                        />
                    </>
                )
            );
        default:
            return null;
    }
};

export default RenderStepSignupContent;
