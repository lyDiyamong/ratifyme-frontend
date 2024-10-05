// React library import
import { Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

// MUI import
import { Grid, Typography } from "@mui/material";

// Custom import
import theme from "../../assets/themes";
import FormInput from "../../components/FormInput";

const AddressFields = ({ control, schema }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xss={12} sm={12}>
                <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                        <>
                            <Select
                                options={countryList().getData()}
                                onChange={(selectedOption) => onChange(selectedOption.value)}
                                onBlur={onBlur}
                                value={countryList()
                                    .getData()
                                    .find((option) => option.value === value)}
                                inputRef={ref}
                                placeholder="Select Country"
                                styles={{
                                    container: (base) => ({ ...base, width: "100%" }),
                                    control: (base) => ({
                                        ...base,
                                        height: "56px",
                                        borderRadius: theme.customShape.input,
                                        background: "none",
                                        zIndex: 1,
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 100, // Higher zIndex for the dropdown options
                                    }),
                                }}
                            />
                            {error && <Typography color="error">{error.message}</Typography>}
                        </>
                    )}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="city"
                    label="City / State"
                    control={control}
                    type="text"
                    rules={{ required: "City is required" }}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="street"
                    label="Street Address"
                    control={control}
                    type="text"
                    rules={{ required: "Street Address is required" }}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="postalCode"
                    label="Postal Code"
                    control={control}
                    type="text"
                    rules={{ required: "Postal Code is required" }}
                />
            </Grid>
        </Grid>
    );
};

export default AddressFields;
