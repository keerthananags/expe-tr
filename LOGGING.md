# Pino Logger Implementation

This project uses Pino logger for structured logging across both backend and frontend applications.

## Overview

- **Backend**: Node.js/Express with Bun runtime
- **Frontend**: React with Vite
- **Logger**: Pino with pretty printing for development

## Backend Logging

### Setup
```bash
cd backend
bun add pino pino-pretty @types/pino
```

### Configuration
- **Location**: `backend/src/utils/logger.ts`
- **Development**: Uses pino-pretty for colored, readable output
- **Production**: Structured JSON logs
- **Log Levels**: `debug`, `info`, `warn`, `error`

### Features
- Request/response logging middleware
- User authentication event logging
- Error tracking with stack traces
- MongoDB connection logging
- IP address and user agent tracking

### Usage Example
```typescript
import logger from './utils/logger';

logger.info("User action completed", { userId, action });
logger.error("Something went wrong", { error: err.message, stack: err.stack });
logger.warn("Deprecated API usage", { endpoint, version });
```

## Frontend Logging

### Setup
```bash
cd frontend
npm install pino pino-pretty
```

### Configuration
- **Location**: `frontend/src/utils/logger.ts`
- **Development**: Console-based logging with emojis
- **Production**: Browser-compatible Pino logger
- **Log Levels**: `debug`, `info`, `warn`, `error`

### Features
- API request/response logging
- Authentication event tracking
- Error handling and reporting
- User action logging

### Usage Example
```typescript
import logger from '../utils/logger';

logger.info("Component mounted", { componentName });
logger.error("API call failed", { endpoint, error: error.message });
```

## Log Levels

| Level | Usage | When to Use |
|-------|-------|-------------|
| `debug` | Detailed information | Development debugging |
| `info` | General information | Important events, user actions |
| `warn` | Warning messages | Deprecated features, potential issues |
| `error` | Error messages | Failures, exceptions |

## Environment Variables

### Backend
```env
LOG_LEVEL=info          # Default: info
NODE_ENV=development    # Controls pretty printing
```

### Frontend
```env
NODE_ENV=development    # Controls logger type
```

## Log Output Examples

### Backend Development
```
[12:34:56.789] INFO: User registered successfully
  userId: "64f8a9b2c3d4e5f6a7b8c9d0"
  email: "user@example.com"
  ip: "::1"
```

### Frontend Development
```
ℹ️ INFO: User logged in successfully {userId: "64f8a9b2c3d4e5f6a7b8c9d0", email: "user@example.com"}
🔍 DEBUG: API Request: POST /api/auth/login {method: "post", url: "/api/auth/login"}
❌ ERROR: API Error: POST /api/auth/login - 401 {status: 401, message: "Invalid credentials"}
```

### Production JSON
```json
{"level":"info","time":"2024-01-15T12:34:56.789Z","service":"expense-tracker-backend","msg":"User registered successfully","userId":"64f8a9b2c3d4e5f6a7b8c9d0","email":"user@example.com","ip":"::1"}
```

## Security Considerations

- **No sensitive data**: Passwords, tokens, or personal information are never logged
- **Sanitized output**: Production logs hide internal error details
- **IP tracking**: Only for security monitoring and debugging
- **User identification**: Only user IDs and emails (no personal data)

## Integration Points

### Backend
- `src/index.ts` - Request middleware, server startup
- `src/controllers/authController.ts` - Authentication events
- `src/middleware/errorMiddleware.ts` - Error handling

### Frontend
- `src/api/axios.ts` - HTTP request/response logging
- `src/context/AuthContext.tsx` - Authentication events

## Monitoring and Debugging

### Development
- Logs appear in terminal with colors and formatting
- Easy to read with timestamp and context
- Debug information available

### Production
- Structured JSON logs for log aggregation tools
- Can be integrated with ELK stack, Datadog, etc.
- Filterable by level, service, and metadata

## Best Practices

1. **Use appropriate log levels** - Don't overuse debug in production
2. **Include context** - Add relevant metadata (userId, action, etc.)
3. **Avoid sensitive data** - Never log passwords, tokens, or PII
4. **Be consistent** - Use similar formatting across the application
5. **Log errors properly** - Include stack traces and context for debugging

## Troubleshooting

### Logs not appearing
- Check LOG_LEVEL environment variable
- Verify logger import and usage
- Ensure middleware is properly configured

### Too many logs
- Adjust log levels in production
- Use debug only for development
- Filter logs by level or component

### Performance impact
- Pino is highly optimized for performance
- Async logging doesn't block main thread
- Minimal overhead in production
