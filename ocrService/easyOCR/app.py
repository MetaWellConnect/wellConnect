from flask import Flask, request, jsonify
from PIL import Image
import easyocr
import io

app = Flask(__name__)
reader = easyocr.Reader(["en"])


@app.route("/health-check", methods=["GET"])
def health_check():
    return jsonify(status="healthy"), 200


@app.route("/run-ocr", methods=["POST"])
def run_ocr():
    if not request.data:
        return jsonify("No medication image uploaded!"), 422

    image_data = Image.open(io.BytesIO(request.data))
    result = reader.readtext(image_data, detail=0)
    return result
