import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

/**
 * Formats a given phone number into international format.
 *
 * @param {string} phoneNumber - The phone number to format.
 * @param {string} countryCode - The country code for parsing (default is "KH").
 * @returns {string|null} - The formatted phone number or null if an error occurs.
 */
function formatPhoneNumber(phoneNumber, countryCode) {
    if (typeof phoneNumber !== "string" || phoneNumber.trim() === "") {
        console.error("Invalid phone number: Phone number must be a non-empty string.");
        return null;
    }

    try {
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
        return phoneUtil.format(number, libphonenumber.PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
        console.error("Error parsing phone number:", error.message);
        return null;
    }
}

export default formatPhoneNumber;
