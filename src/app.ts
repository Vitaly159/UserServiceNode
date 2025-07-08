import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json()); // для парсинга JSON

// Здесь можно подключить маршруты, например:
// import userRoutes from './routes/userRoutes';
// app.use('/api/users', userRoutes);

export default app;
