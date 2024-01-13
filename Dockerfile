FROM node:20.11.0-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
