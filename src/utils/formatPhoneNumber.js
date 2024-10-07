/**
 * Formats a phone number from the database (e.g., "855719970300527")
 * by adding a '+' sign at the beginning.
 *
 * @param {string} phoneNumber - The phone number from the database (e.g., "855719970300527").
 * @returns {string} - The formatted phone number with '+' (e.g., "+855719970300527").
 */
function formatPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== "string" || phoneNumber.trim() === "") {
        console.error("Invalid phone number: Phone number must be a non-empty string.");
        return null;
    }

    // Ensure phone number starts with a '+'
    if (!phoneNumber.startsWith("+")) {
        // Add the '+' sign at the beginning
        phoneNumber = `+${phoneNumber}`;
    }

    // Return the phone number directly without additional formatting
    return phoneNumber;
}

export default formatPhoneNumber;
