import * as yup from "yup";

const badgeSchema = yup.object().shape({
    narrative: yup
        .string()
        .required("⚠️ Criteria is required")
        .min(10, "⚠️ Criteria must be at least 10 characters long")
        .max(150, "⚠️ Criteria cannot exceed 150 characters"),
    AchievementTypes: yup
        .array()
        .of(yup.string()) // assuming AchievementTypes contains strings, adjust if necessary
        .min(1, "⚠️ At least one achievement type must be selected")
        .required("⚠️ Achievement type is required"),
    startedDate: yup
        .date()
        .typeError("⚠️ Please select a valid date")
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "⚠️ Start date cannot be in the past")
        .required("⚠️ Start date is required"),
    endDate: yup
        .date()
        .typeError("⚠️ Please select a valid date")
        .min(yup.ref("startedDate"), "⚠️ End date cannot be earlier than Start Date")
        .required("⚠️ End date is required"),
    expiredDate: yup
        .date()
        .typeError("⚠️ Please select a valid date")
        .min(yup.ref("endDate"), "⚠️ Expiration date cannot be earlier than End Date")
        .required("⚠️ Expired date is required."),
    badgeName: yup
        .string()
        .min(3, "⚠️ Badge name must be at least 3 characters long")
        .max(150, "⚠️ Badge name cannot exceed 150 characters")
        .required("⚠️ Badge name is required"),
    badgeDescription: yup.string().max(255, "⚠️ Description cannot exceed 255 characters").required("⚠️ Description is required"),
    additionLink: yup.string().url("⚠️ Invalid URL format"),
});

export default badgeSchema;
