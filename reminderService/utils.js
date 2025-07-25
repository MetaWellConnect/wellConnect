async function fetchWithErrorHandling(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = await response.json();
        const errorStatus = response.status;

        const error = new Error(errorMessage);
        error.status = errorStatus;
        throw error;
    }

    return response;
}

module.exports = { fetchWithErrorHandling }
