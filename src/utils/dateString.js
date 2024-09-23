import dayjs from "dayjs";

const FormatDate = ( dateString ) => {
    console.log("Input Date String:", dateString);
    // Check if dateString is valid and format the date
    const date = dayjs(dateString).isValid() ? dayjs(dateString).format("DD-MM-YYYY") : "Invalid Date";

    return date;
};

export default FormatDate;