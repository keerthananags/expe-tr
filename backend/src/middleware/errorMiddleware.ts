import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    msg: "Unhandled error",
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(500).json({
    message: isDevelopment ? err.message : "Internal server error",
    ...(isDevelopment && { stack: err.stack })
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn({
    msg: "Route not found",
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
    hint: req.originalUrl.startsWith('/api')
      ? 'Use /api, /api/health, /api/auth/register, /api/auth/login, /api/auth/me, /api/transactions, /api/protected'
      : 'Frontend route not available in backend, check your client routing or proxy config'
  });
};
