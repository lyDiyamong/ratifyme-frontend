import * as yup from "yup";

const updatePasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must be less than 30 characters")
        .required("Badge name is required"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords do not match") 
        .required("Please confirm your password"),
});

export default updatePasswordSchema;
