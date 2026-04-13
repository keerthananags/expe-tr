import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Create a browser-compatible logger
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  browser: {
    asObject: true,
    transmit: {
      level: 'warn',
      send: (level, logEvent) => {
        // In production, you might want to send logs to a service
        // For now, we'll just use console methods
        if (level === 'error') {
          console.error(logEvent);
        } else if (level === 'warn') {
          console.warn(logEvent);
        } else {
          console.log(logEvent);
        }
      }
    }
  },
  base: {
    pid: false,
    hostname: false,
    service: 'expense-tracker-frontend'
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label };
    }
  }
});

// Create a simpler console-based logger for development
const consoleLogger = {
  debug: (message: string, meta?: any) => {
    if (isDevelopment) {
      console.log(`🔍 DEBUG: ${message}`, meta || '');
    }
  },
  info: (message: string, meta?: any) => {
    if (isDevelopment) {
      console.log(`ℹ️ INFO: ${message}`, meta || '');
    }
  },
  warn: (message: string, meta?: any) => {
    console.warn(`⚠️ WARN: ${message}`, meta || '');
  },
  error: (message: string, meta?: any) => {
    console.error(`❌ ERROR: ${message}`, meta || '');
  }
};

// Export the appropriate logger based on environment
export default isDevelopment ? consoleLogger : logger;
