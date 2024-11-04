import * as yup from "yup";

const academicBgSchema = yup.object().shape({
    academicYear: yup
        .date()
        .required("Academic Year is required")
        .typeError("Please provide a valid date for the Academic Year.")
        .test("is-valid-date", "Please provide a valid date for the Academic Year.", (value) => {
            return value instanceof Date && !isNaN(value);
        }),
    academicLevelId: yup.string().required("Academic Level is required"),
    fieldOfStudyId: yup.string().required("Field of Study is required"),
});

export default academicBgSchema;
