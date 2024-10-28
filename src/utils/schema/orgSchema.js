import * as yup from "yup";

const orgSchema = yup.object().shape({
    institutionName: yup
        .string()
        .min(6, "Organization name must be at least 6 characters")
        .max(30, "Organization name be less than 30 characters")
        .required("Organization name is required"),
    institutionEmail: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    institutionWebsiteUrl: yup
    .string()
    .url("Invalid URL format"),
});

export default orgSchema;
