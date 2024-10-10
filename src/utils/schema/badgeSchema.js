import * as yup from "yup";

const badgSchema = yup.object({
    badgeName: yup.string().min(6, "Name must be at least 6 characters").max(30, "Name must be less than 30 characters").required("Badge name is required"),
    badgeDescription: yup.string().max(300, "Name must be at least 300 characters"),
    tags: yup.string().max(255, "Name must be less than 255 characters"),
    narrative: yup.string().min(10, "Criteria must be at least 10 characters").max(255, "Criteria must be at least 255 characters").required("Criteria is required")
});

export default badgSchema;
