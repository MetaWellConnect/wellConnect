FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "npm run dev"]
