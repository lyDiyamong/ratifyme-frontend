import dayjs from "dayjs";

const FormatYear = ({ dateString }) => {
    // Check if dateString is valid and format the year
    const year = dayjs(dateString).isValid() ? dayjs(dateString).format("YYYY") : "Invalid Date";

    return year; // Use span for simpler display
};

export default FormatYear;
