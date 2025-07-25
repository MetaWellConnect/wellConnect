FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN sleep 15

CMD sh -c "node index.js"
