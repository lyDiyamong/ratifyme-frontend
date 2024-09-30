import { useState, useEffect } from "react";

/**
 * Custom hook to manage error messages.
 *
 * @param {boolean} isError - Boolean flag indicating whether an error has occurred.
 * @param {string} errorMsg - The error message to be displayed.
 * @returns {String}  errorMessage: The current error message.
 *
 */
export default function useError(isError, errorMsg) {

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isError && errorMsg) {
            setErrorMessage(errorMsg);
        }
    }, [isError, errorMsg]);

    return errorMessage
}