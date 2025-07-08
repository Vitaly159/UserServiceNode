# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Компилируем TypeScript (если используете)
RUN npx tsc

# Открываем порт, на котором слушает сервер
EXPOSE 5001

# Запускаем сервер
CMD ["node", "dist/server.js"]