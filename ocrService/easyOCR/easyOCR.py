import easyocr

reader = easyocr.Reader(['en'])
result = reader.readtext('../uploads/advil.jpg')

for (bbox, text, prob) in result:
        print(f'Text: {text}, Probability: {prob}')
