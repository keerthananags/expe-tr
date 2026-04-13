import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",

  // ❌ Removed customPrettifiers (causes DataCloneError in Bun)
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:mm:ss Z",
          ignore: "pid,hostname",
        },
      }
    : undefined,

  base: {
    // cleaner logs
    pid: undefined,
    hostname: undefined,
    service: "expense-tracker-backend",
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

export default logger;