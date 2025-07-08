import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json()); // для парсинга JSON

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8")); // Загрузка спецификации

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument as swaggerUi.JsonObject)); // Маршрут для документации

export default app;
