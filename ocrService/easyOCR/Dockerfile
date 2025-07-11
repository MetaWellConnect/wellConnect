FROM python:3.12-slim-bookworm

WORKDIR /app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["sh", "-c", "flask run --host=0.0.0.0"]
