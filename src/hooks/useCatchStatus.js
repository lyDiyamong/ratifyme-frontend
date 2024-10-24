// React library import
import { useState, useEffect } from "react";

/**
 * Custom hook to manage error messages.
 *
 * @param {boolean} status - status for error or success
 * @param {string} statusMessage - The message to be displayed.
 * @param {number} [clearAfter] - Optional time in milliseconds to clear the message automatically.
 * @returns {[string, Function]} - The current message from the API and a function to manually clear the message.
 */
// ============ Start useCatchStatus ============
export default function useCatchStatus(status, statusMessage, clearAfter = 5000) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status && statusMessage) {
            setMessage(statusMessage);

            // Clear message after a certain time if status indicates success or error
            const timer = setTimeout(() => {
                setMessage("");
            }, clearAfter);

            return () => clearTimeout(timer);
        }
    }, [status, statusMessage, clearAfter]);

    return [message, setMessage]; 
}
// ============ End useCatchStatus ============