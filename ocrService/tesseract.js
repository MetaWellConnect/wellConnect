import { createWorker } from "tesseract.js";
import sharp from "sharp";
const worker = await createWorker('eng');

async function preprocessImage(inputPath, outputPath) {
    await sharp(inputPath)
        .autoOrient()
        .sharpen()
        .grayscale()
        .toFile(outputPath)
}

async function runOCR(filePath) {
    const { data: { text } } = await worker.recognize(filePath);
    console.log(text);
}

await preprocessImage('./images/med.jpg', './images/medPROCESSED.jpg')
await runOCR('./images/medPROCESSED.jpg')
process.exit(1);
