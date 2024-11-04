// React library import
import * as yup from "yup";

export const passwordSchema = ({ passwordName = "password", passwordConfirmName = "passwordConfirm" }) =>
    yup.object({
        [passwordName]: yup
            .string()
            .min(8, "⚠️ Your password must be at least 8 characters.")
            .max(15, "⚠️ Your password must be at most 15 characters.")
            .matches(/[a-z]/, "⚠️ Your password must contain at least one lowercase letter.")
            .matches(/[A-Z]/, "⚠️ Your password must contain at least one uppercase letter.")
            .matches(/\d/, "⚠️ Your password must contain at least one number.")
            .matches(/^[^ ]*$/, "⚠️ Your password must not contain spaces.")
            .matches(/^[^\p{Emoji_Presentation}]*$/u, "⚠️ Your password must not contain emojis.")
            .matches(/[!@#$%^&*()_\-+=`~[\]{}|\\:;"'<>,.?/]/, "⚠️ Your password must contain at least one special character.")
            .required("Password is required"),
        [passwordConfirmName]: yup
            .string()
            .oneOf([yup.ref(passwordName)], "⚠️ Passwords must match")
            .required("Confirm password is required"),
    });

// Update the password strength function to align with the full criteria
export const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8 && password.length <= 15) strength += 20; // Length criterion
    if (/[a-z]/.test(password)) strength += 20; // Lowercase
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase
    if (/\d/.test(password)) strength += 20; // Number
    if (/[!@#$%^&*()_\-+=`~[\]{}|\\:;"'<>,.?/]/.test(password)) strength += 20; // Special character
    return strength;
};

// Update validation helper to match all criteria
export const validatePassword = (password) => {
    return {
        hasMinLength: password.length >= 8 && password.length <= 15,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_\-+=`~[\]{}|\\:;"'<>,.?/]/.test(password),
        hasNoSpaces: /^[^ ]*$/.test(password),
        hasNoEmojis: /^[^\p{Emoji_Presentation}]*$/u.test(password),
    };
};
