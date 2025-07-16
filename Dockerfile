# Используем официальный образ Node.js
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 5001

# Запускаем сервер
CMD ["npx", "ts-node", "src/server.ts"]