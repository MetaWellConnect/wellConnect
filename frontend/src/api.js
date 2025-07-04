const API_URL = import.meta.env.VITE_API_URL;

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

    const response = await fetch(`${API_URL}/register`, getHttpOptions("POST", userInfo))
    if (!response.ok) {
        throw new Error("Failed to register user!");
    }

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

    const response = await fetch(`${API_URL}/login`, getHttpOptions("POST", userInfo));
    if (!response.ok) {
        throw new Error("Invalid credentials!");
    }

    console.log(await response.json());
}

export async function getCurrentUser(cookie) {
    const response = await fetch(`${API_URL}/login`, getHttpOptions("POST", userInfo));
    if (!response.ok) {
        throw new Error("Invalid credentials!");
    }

    console.log(await response.json());
}
