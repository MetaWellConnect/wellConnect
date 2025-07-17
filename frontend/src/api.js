const API_URL = import.meta.env.VITE_API_URL;

const AccountTypes = {
    PATIENT: "PATIENT",
    PROVIDER: "PROVIDER"
}

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

function getHttpOptions(httpMethod, bodyContent) {
    const NUM_OF_ARGS = 2;
    let options;

    switch (httpMethod) {
        case "GET":
            options = {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                },
            }

            // If the user passed bodyContent, add it to the request
            if (arguments.length === NUM_OF_ARGS) {
                options.body = JSON.stringify(bodyContent);
            }

            return options;

        case "POST":
            options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

            }

            // If the user passed bodyContent, add it to the request
            if (arguments.length === NUM_OF_ARGS) {
                options.body = JSON.stringify(bodyContent);
            }

            return options;

        case "PUT":
            options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }

            // If the user passed bodyContent, add it to the request
            if (arguments.length === NUM_OF_ARGS) {
                options.body = JSON.stringify(bodyContent);
            }

            return options;

        case "DELETE":
            options = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json'
                },
            }

            // If the user passed bodyContent, add it to the request
            if (arguments.length === NUM_OF_ARGS) {
                options.body = JSON.stringify(bodyContent);
            }

            return options;

        default:
            return "No method specified!"
    }
}

export async function registerUser(firstName, lastName, email, password, accountType) {
    const userInfo = {
        user: {
            firstName,
            lastName,
            email,
            password,
            accountType
        }
    }

    const response = await fetchWithErrorHandling(`${API_URL}/register`, getHttpOptions("POST", userInfo))
    console.log(await response.json());
    return true;
}

export async function loginUser(email, password) {
    const userInfo = {
        user: {
            email,
            password
        }
    }

    const response = await fetchWithErrorHandling(`${API_URL}/login`, getHttpOptions("POST", userInfo));

    console.log(await response.json());
}

export async function logoutUser() {
    const response = await fetchWithErrorHandling(`${API_URL}/logout`, getHttpOptions("POST"));

    console.log(await response.json());
}

export async function getCurrentUser(cookie) {
    const response = await fetchWithErrorHandling(`${API_URL}/login`, getHttpOptions("POST", userInfo));
    if (!response.ok) {
        throw new Error("Invalid credentials!");
    }

    console.log(await response.json());
}

export async function getPatient(patientId) {
    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}`, getHttpOptions("GET"));

    return (await response.json());
}

export async function getPatientMedications(patientId) {
    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}/medications`, getHttpOptions("GET"));

    return (await response.json());
}

export async function getPatientTreatment(patientId) {
    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}/treatment`, getHttpOptions("GET"));

    return (await response.json());
}

export async function getProvider(providerId) {
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}`, getHttpOptions("GET"));

    return (await response.json());
}

export async function getProviderPatients(providerId) {
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}/patients`, getHttpOptions("GET"));

    return (await response.json());
}


export async function getMedicationsToApprove(providerId) {
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}/medicationsToApprove`, getHttpOptions("GET"));

    return (await response.json());
}

export async function getAppointments(id, role) {
    let providerId = id;

    // If a patient is requesting the information, find out the patient's provider
    // Then retrieve the censored appointments without other patients information
    if (role === AccountTypes.PATIENT) {
        const patient = await getPatient(id);
        providerId = patient.provider_id;

        const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}/appointments?role=${role}&patientId=${id}`, getHttpOptions("GET"));
        return (await response.json());
    }

    // If a provider requests the information, return the appointments with all information
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}/appointments`, getHttpOptions("GET"));
    return (await response.json());
}
