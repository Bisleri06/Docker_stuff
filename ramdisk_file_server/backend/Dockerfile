# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
ENV BASE_PATH   /playground
ENV BACKUP_PATH /data
CMD ["node","app.js"]
EXPOSE 3001