import React from "react";
import dayjs from "dayjs";

const FormatYear = ({ dateString }) => {
    // Check if dateString is valid and format the year
    console.log('Date string:', dateString);
    const year = dayjs(dateString).isValid() ? dayjs(dateString).format("YYYY") : "Invalid Date";

    return <span>{year}</span>; // Use span for simpler display
};

export default FormatYear;
