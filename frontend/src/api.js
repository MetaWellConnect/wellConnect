const API_URL = import.meta.env.VITE_API_URL;
const NAME_ERROR_MESSAGE = "Unable to identify medication name.";
const STRENGTH_ERROR_MESSAGE = "Unable to identify medication strength.";

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
                credentials: 'include',
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
                credentials: 'include',
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
                credentials: 'include',
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

export async function registerUser(firstName, lastName, email, providerEmail, password, accountType) {
    const userInfo = {
        user: {
            firstName,
            lastName,
            email,
            password,
            providerEmail,
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

export async function getApprovedPatientMedications(patientId) {
    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}/medications/approved`, getHttpOptions("GET"));
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


export async function runOCR(imgSrc) {
    let imgBlob = await fetch(imgSrc).then(res => res.blob());

    const form = new FormData();
    form.append("medicationImage", imgBlob, "photo.jpg");

    // Custom options const as POST/medications/run-ocr requiers a form instead of JSON
    const response = await fetch(`${API_URL}/medications/run-ocr`, {
        method: "POST",
        body: form,
        credentials: 'include'
    });

    // If we recieved an error, return a JSON explaining the medication was unable to be parsed to the user
    if (!response.ok) {
        const errorResponse = {
            name: NAME_ERROR_MESSAGE,
            strength: STRENGTH_ERROR_MESSAGE
        }

        return errorResponse;
    }

    return (await response.json());
}

export async function getAppointments(id, role) {
    let providerId = id;
    let url;

    // If a patient is requesting the information, find out the patient's provider
    // Then retrieve the censored appointments without other patients information
    if (role === AccountTypes.PATIENT) {
        const patient = await getPatient(id);
        providerId = patient.provider_id;

        url = `${API_URL}/providers/${providerId}/appointments?role=${role}&patientId=${id}`;
    } else {
        url = `${API_URL}/providers/${providerId}/appointments`;
    }

    // If a provider requests the information, return the appointments with all information
    const response = await fetchWithErrorHandling(url, getHttpOptions("GET"));
    return (await response.json());
}

export async function getSuggestedAppointments(id, role, duration) {
    const provider_id = await getProviderIdIfPatientRequest(id, role);
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${provider_id}/appointments/suggested?duration=${duration}`, getHttpOptions("GET"));
    return (await response.json());
}

async function getProviderIdIfPatientRequest(id, role) {
    if (role === AccountTypes.PATIENT) {
        const patient = await getPatient(id);
        return patient.provider_id;
    }

    return id;
}

export async function postAppointment(id, role, date, duration_in_minutes, name, patientId) {
    let patient_id = patientId;
    let provider_id;

    if (role === AccountTypes.PATIENT) {
        patient_id = id;
        const patient = await getPatient(id);
        provider_id = patient.provider_id;
    }

    if (role === AccountTypes.PROVIDER) {
        provider_id = id;
    }

    const appointmentInformation = {
        provider_id,
        patient_id,
        date: new Date(date),
        duration_in_minutes,
        name
    }

    const response = await fetchWithErrorHandling(`${API_URL}/providers/${provider_id}/appointments/`, getHttpOptions("POST", appointmentInformation));
    return (await response.json());
}

export async function postProviderPreferences(id, providerPreferencesInfo) {
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${id}/preferences`, getHttpOptions("PUT", providerPreferencesInfo));
    return (await response.json());
}

export async function getProviderPreferences(providerId) {
    const response = await fetchWithErrorHandling(`${API_URL}/providers/${providerId}/preferences`, getHttpOptions("GET"));
    return (await response.json());
}

export async function postMedication(patientId, name, strength, imgSrc) {
    if (imgSrc === null) {
        throw new Error("Image is null!");
    }

    if (name === undefined || name === "") {
        throw new Error('Name cannot be null or empty!');
    }

    if (name === NAME_ERROR_MESSAGE) {
        throw new Error('Failed to parse medication name!');
    }

    if (strength === undefined || strength === "") {
        throw new Error('Strength cannot be null or empty!');
    }

    if (strength === STRENGTH_ERROR_MESSAGE) {
        throw new Error('Failed to parse medication strength!');
    }


    let imgBlob = await fetch(imgSrc).then(res => res.blob());

    const form = new FormData();
    form.append("name", name);
    form.append("strength", strength);
    form.append("image", imgBlob, "photo.jpg");

    const response = await fetch(`${API_URL}/patients/${patientId}/medications`, {
        method: "POST",
        body: form,
        credentials: 'include'
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        const errorStatus = response.status;

        const error = new Error(errorMessage);
        error.status = errorStatus;
        throw error;
    }

    return (await response.json());
}

export async function putMedication(patientId, medicationId, medicationInfo) {
    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}/medications/${medicationId}`, getHttpOptions("PUT", medicationInfo));
    return (await response.json());
}

export async function putTreatmentPlan(patientId, treatmentOverview, medications) {
    const treatmentInformation = {
        overview: treatmentOverview,
        medications: medications
    }

    const response = await fetchWithErrorHandling(`${API_URL}/patients/${patientId}/treatment`, getHttpOptions("PUT", treatmentInformation));
    return (await response.json());
}
