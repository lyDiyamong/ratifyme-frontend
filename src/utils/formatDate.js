import dayjs from "dayjs";

const FormatDate = ( dateString ) => {
    if (!dateString) return "Invalid Date"; // Handle null or undefined dateString

    const formattedDate = dayjs(dateString).isValid() ? dayjs(dateString).format("YYYY-MM-DD") : "Invalid Date";

    return formattedDate;
};

export default FormatDate;
