import * as yup from "yup";

const orgSchema = yup.object().shape({
    institutionName: yup
        .string()
        .max(30, "⚠️ Organization name be less than 30 characters")
        .min(2, "⚠️ Organization name must be at least 2 characters")
        .required("⚠️ Organization name is required"),
    institutionEmail: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "⚠️ Invalid email format"),
    institutionWebsiteUrl: yup.string().url("⚠️ Invalid URL format"),
    institutionPhoneNumber: yup
        .string()
        .required("⚠️ Phone number is required")
        .min(12, "⚠️ Phone number is invalid")
        .max(15, "⚠️ Phone number must be less than or equal to 15 characters"),
});

export default orgSchema;