FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -g prisma

COPY . .

CMD ["sh", "-c", "npm run db:init && npx prisma generate && npm run dev"]
