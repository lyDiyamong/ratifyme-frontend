import * as yup from "yup";

const badgeSchema = yup.object().shape({
    badgeName: yup
        .string()
        .min(6, "Name must be at least 6 characters")
        .max(30, "Name must be less than 30 characters")
        .required("Badge name is required"),
    badgeDescription: yup.string().max(300, "Name must be at least 300 characters"),
    tags: yup.string().max(255, "Name must be less than 255 characters"),
    narrative: yup
        .string()
        .min(10, "Criteria must be at least 10 characters")
        .max(255, "Criteria must be at least 255 characters")
        .required("Criteria is required"),
    startedDate: yup
        .date()
        .required("Start date is required")
        .typeError("Please select a valid date")
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Start date cannot be in the past"),
    // endDate: yup
    //     .date()
    //     .required("End date is required")
    //     .typeError("Please select a valid date")
    //     .min(yup.ref("startedDate"), "End date cannot be earlier than Start Date"),
});

export default badgeSchema;
