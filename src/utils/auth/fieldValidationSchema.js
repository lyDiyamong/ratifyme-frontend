import * as yup from "yup";

export const schema = yup.object({
    firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "⚠️ First name must contain only letters and no spaces")
        .required("⚠️ First name is required"),
    lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "⚠️ Last name must contain only letters and no spaces")
        .required("⚠️ Last name is required"),
    genderId: yup.string().required("⚠️ Gender is required"),
    username: yup
        .string()
        .matches(
            /^[a-zA-Z0-9._-]+$/,
            "⚠️ Username must not contain spaces and can only include letters, numbers, dots, underscores, and hyphens.",
        )
        .required("⚠️ Username is required"),
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "⚠️ Invalid email format")
        .required("⚠️ Email is required"),
    phoneNumber: yup.string().required("⚠️ Phone number is required"),
    country: yup.string().required("⚠️ Country is required"),
    city: yup.string().required("⚠️ City is required"),
    street: yup.string().required("⚠️ Street is required"),
    postalCode: yup.string().matches(/^\d+$/, "⚠️ Verification code must be numeric").required("Verification code is required"),
    institutionName: yup.string().required("⚠️ Institution name is required"),
    institutionPhoneNumber: yup.string().required("⚠️ Phone number is required"),
    institutionEmail: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("⚠️ Email is required"),
    url: yup.string().url("⚠️ Invalid URL format"),
    dateOfBirth: yup
        .date()
        .typeError("⚠️ Please select a valid date")
        .max(new Date(), "⚠️ Date of Birth cannot be in the future")
        .required("⚠️ Date of Birth is required"),
});
