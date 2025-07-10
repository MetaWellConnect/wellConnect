import { createWorker } from "tesseract.js";
import sharp from "sharp";
import { parseOCRText } from "./parser.js";
const worker = await createWorker('eng');

async function preprocessImage(inputPath, outputPath) {
    await sharp(inputPath)
        .autoOrient()
        .sharpen()
        .grayscale()
        .threshold(200)
        .toFile(outputPath)
}

async function runOCR(filePath) {
    const { data: { text } } = await worker.recognize(filePath);
    console.log(text);
    return text;
}

await preprocessImage('./images/advil.jpg', './images/processedImage.jpg')
const OCR_text = await runOCR('./images/processedImage.jpg');

try {
    const response = await parseOCRText(OCR_text);
    console.log(response);
} catch (e) {
    console.error(e.message);
}
process.exit(1);
