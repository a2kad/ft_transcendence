FROM node:20-alpine

WORKDIR /app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости прямо в контейнере
RUN apk add --no-cache python3 make g++ python3-dev py3-distutils \
    && npm install --build-from-source \
    && apk del python3-dev py3-distutils make g++

# Копируем остальной код
COPY . .

# Команда запуска
CMD ["npm", "run", "start"]
EXPOSE 3001