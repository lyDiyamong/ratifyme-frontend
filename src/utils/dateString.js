import dayjs from "dayjs";

const FormatDate = (dateString) => {

    // Check if the dateString is valid
    if (!dayjs(dateString).isValid()) {
        return "Invalid Date";
    }

    // Format the date to "DD/MM/YYYY"
    return dayjs(dateString).format("DD/MM/YYYY");
};
export default FormatDate