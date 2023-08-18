# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD ["npm","start"]
EXPOSE 3000