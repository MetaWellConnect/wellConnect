FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 5001

CMD ["sh", "-c", "npm run dev"]
