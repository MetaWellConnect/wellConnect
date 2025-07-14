require('dotenv').config();
const FormData = require('form-data');

const OLLAMA_API_URL = process.env.OLLAMA_API_URL;
const OCR_SERVICE_API_URL = process.env.OCR_SERVICE_API_URL;

async function parseOCRText(text) {
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

async function runOCROnImage(medicationImage) {
    const url = `${OCR_SERVICE_API_URL}/run-ocr`;
    const options = {
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/octet-stream'
        },
        body: medicationImage.buffer
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = await response.json();
        const errorStatus = response.status;

        const error = new Error(errorMessage);
        error.status = errorStatus;
        throw error;
    }

    return await response.json();
}

module.exports = {
    parseOCRText,
    runOCROnImage
}
