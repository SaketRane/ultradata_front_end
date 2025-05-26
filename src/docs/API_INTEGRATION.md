
# API Integration Guide for Spring Boot Backend

This document outlines the expected API structure for integrating the React frontend with the Spring Boot backend.

## Authentication Endpoints

The frontend expects these authentication endpoints:

### POST /auth/login
```json
Request:
{
  "username": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}

Response (2FA Required):
{
  "requiresTwoFactor": true,
  "message": "2FA required"
}
```

### POST /auth/register
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Registration successful"
}
```

### POST /auth/logout
```json
Request: {}
Response: { "message": "Logged out successfully" }
```

### GET /auth/profile
```json
Response:
{
  "id": "user-id",
  "email": "user@example.com",
  "role": "admin" | "user",
  "company_id": "company-id" | null
}
```

### POST /auth/verify-2fa
```json
Request:
{
  "token": "123456"
}

Response:
{
  "message": "2FA verified successfully"
}
```

### POST /auth/reset-password
```json
Request:
{
  "email": "user@example.com"
}

Response:
{
  "message": "Password reset email sent"
}
```

### POST /auth/update-password
```json
Request:
{
  "password": "newpassword123"
}

Response:
{
  "message": "Password updated successfully"
}
```

## Data Endpoints

### Financial Data Structure

Each financial table uses codes in the format: `[SheetCode][RowCode][ColumnCode]`

Examples:
- `201401002` = Sheet 2014, Row 01, Column 02
- `705009014` = Sheet 7050, Row 09, Column 14

### Expected Data Endpoints

#### GET /api/financial-data/{year}/{insurer}/{sheetCode}
Returns financial data for a specific sheet, year, and insurer.

```json
Response:
{
  "sheetCode": "2014",
  "year": 2023,
  "insurer": "Company Name",
  "data": {
    "201401002": 1000000,
    "201401006": 500000,
    // ... more data points
  }
}
```

#### GET /api/insurers
Returns list of available insurers.

```json
Response:
[
  {
    "id": "insurer-1",
    "name": "Insurance Company A",
    "code": "ICA"
  },
  {
    "id": "insurer-2", 
    "name": "Insurance Company B",
    "code": "ICB"
  }
]
```

#### GET /api/years
Returns available years for data.

```json
Response: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
```

## Security

- Use JWT tokens for authentication
- Include `Authorization: Bearer <token>` header in authenticated requests
- Implement proper CORS configuration for the React frontend
- Handle token expiration and refresh appropriately

## Error Handling

Standard error response format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details if needed"
  }
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized  
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development Notes

- The frontend currently uses mock data in development mode
- Set `VITE_USE_MOCK_AUTH=true` in environment variables to use mock authentication
- The `DEV_MODE` flag in `src/utils/auth-utils.ts` controls mock behavior
- All API calls go through `src/integrations/database/client.ts`
