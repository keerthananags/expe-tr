import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { protect } from "./middleware/authMiddleware";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import logger from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Expense Tracker API",
    version: "1.0.0",
    description: "API docs for the Expense Tracker backend",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      msg: `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  next();
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/api", (_req, res) => 
  res.json({
    message: "Expense Tracker API is running",
    endpoints: [
      "GET /api/health",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/auth/me",
      "GET /api/transactions",
      "POST /api/transactions",
      "PUT /api/transactions/:id",
      "DELETE /api/transactions/:id",
      "GET /api/transactions/summary",
      "GET /api/protected"
    ]
  })
);

app.get("/api/health", (_, res) => res.json({ status: "OK" }));

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    logger.info({
      msg: "MongoDB connected successfully"
    });
    app.listen(PORT, () => logger.info({
      msg: `Server running on port ${PORT}`
    }));
  })
  .catch((err) => logger.error({
    msg: "MongoDB connection error",
    error: err.message,
    stack: err.stack
  }));