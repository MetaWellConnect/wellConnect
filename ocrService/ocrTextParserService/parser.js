import { configDotenv } from "dotenv";
configDotenv();

const OLLAMA_API_URL = process.env.OLLAMA_API_URL;

export async function parseOCRText(text) {
    const prompt = `
    Extract medication name and medication dosage/strength from the following medication label
    ------------------------------------------------------------------------------------------
    ${text}
    ------------------------------------------------------------------------------------------
    Return your response as a single, valid JSON object. Do not include any introductory text or any surrounding markdown or other text
    Here is the format:
    {
        "name":         ""
        "strength":     ""
    }`;

    const url = `${OLLAMA_API_URL}/api/generate`
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
        body: JSON.stringify({
            model: 'llama3.2:3b',
            prompt: prompt,
            stream: false
        })
    }

    const response = await fetch(url, options)
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error ${response.status}: ${errorResponse.message}`);
    }

    const jsonResponse = await response.json();
    const medicationInformation = jsonResponse.response;
    
    return (JSON.parse(medicationInformation));
}
