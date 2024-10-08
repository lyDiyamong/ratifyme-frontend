import * as yup from "yup";

export const passwordSchema = ({ passwordName = "password", passwordConfirmName = "passwordConfirm" }) =>
    yup.object({
        [passwordName]: yup
            .string()
            .min(10, "⚠️ Your password must be at least 10 characters.")
            .matches(/[a-z]/, "⚠️ Your password must contain at least one lowercase letter.")
            .matches(/[A-Z]/, "⚠️ Your password must contain at least one uppercase letter.")
            .matches(/\d/, "⚠️ Your password must contain at least one number.")
            .matches(/[@$!%*?&]/, "⚠️ Your password must contain at least one special character.")
            .required("Password is required"),
        [passwordConfirmName]: yup
            .string()
            .oneOf([yup.ref(passwordName)], "⚠️ Passwords must match")
            .required("Confirm password is required"),
    });

export const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 10) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[@$!%*?&]/.test(password)) strength += 20;
    return strength;
};

export const validatePassword = (password) => {
    return {
        hasMinLength: password.length >= 10,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&]/.test(password),
    };
};
