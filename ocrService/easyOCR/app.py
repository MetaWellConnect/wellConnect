from flask import Flask, request, jsonify
import numpy
from PIL import Image
import easyocr

app = Flask(__name__)
reader = easyocr.Reader(["en"])


@app.route("/health-check", methods=["GET"])
def health_check():
    return jsonify(status="healthy"), 200


@app.route("/run-ocr", methods=["POST"])
def run_ocr():
    if 'medicationImage' not in request.files:
        return jsonify("No medication image uploaded!"), 422

    image = request.files["medicationImage"]
    image_data = numpy.array(Image.open(image))

    result = reader.readtext(image_data, detail=0)
    return result
