# Filename: Dockerfile
FROM node:19.0.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]