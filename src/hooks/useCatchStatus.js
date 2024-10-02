import { useState, useEffect } from "react";

/**
 * Custom hook to manage error messages.
 *
 * @param {boolean} status - status for error or success
 * @param {string} successMsg - The message to be displayed.
 * @returns {String}  message: The current message from the api.
 *
 */
export default function useCatchStatus(status, statusMessage) {

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status && statusMessage) {
            setMessage(statusMessage);
        }
    }, [status, statusMessage]);

    return message
}