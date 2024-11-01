import * as yup from "yup";

const today = new Date();
const minDateOfBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

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
        .matches(/^[a-zA-Z0-9_]+$/, "⚠️ Username can only include letters, numbers, and underscores.")
        .min(3, "⚠️ Username must be at least 3 characters.")
        .max(15, "⚠️ Username must be at most 15 characters.")
        .required("⚠️ Username is required"),
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "⚠️ Invalid email format")
        .required("⚠️ Email is required"),
    phoneNumber: yup
        .string()
        .required("⚠️ Phone number is required")
        .min(12, "⚠️ Phone number is invalid")
        .max(15, "⚠️ Phone number must be less than or equal to 15 characters"),
    country: yup.string().required("⚠️ Country is required"),
    city: yup
        .string()
        .required("⚠️ City is required")
        .min(2, "⚠️ City must be at least 2 characters")
        .max(50, "⚠️ City cannot be longer than 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "⚠️ City must only contain letters and spaces"),
    street: yup.string().required("⚠️ Street is required"),
    postalCode: yup
        .string()
        .matches(/^\d{5,6}$/, "⚠️ Postal code must be 5 or 6 digits")
        .required("Postal code is required"),
    institutionName: yup
        .string()
        .min(3, "⚠️ Institution name must be at least 3 characters.")
        .max(50, "⚠️ Institution name must be at most 50 characters.")
        .required("⚠️ Institution name is required"),

    institutionPhoneNumber: yup
        .string()
        .required("⚠️ Phone number is required")
        .min(12, "⚠️ Phone number is invalid")
        .max(15, "⚠️ Phone number must be less than or equal to 15 characters"),
    institutionEmail: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "⚠️ Invalid email format")
        .required("⚠️ Email is required"),
    dateOfBirth: yup
        .date()
        .typeError("⚠️ Please select a valid date")
        .max(minDateOfBirth, "⚠️ You must be at least 18 years old")
        .required("⚠️ Date of Birth is required"),
    institutionWebsiteUrl: yup.string().url("⚠️ Please enter a valid URL"),
});
