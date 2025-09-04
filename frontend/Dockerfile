FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
RUN chmod +x node_modules/.bin/vite

CMD ["npm", "run", "dev"]
