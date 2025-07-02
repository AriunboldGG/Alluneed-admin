# Mock Login Credentials

This project now uses mock authentication data instead of a backend API. You can use any of the following credentials to log in:

## Available Users

### 1. Admin User
- **Email:** `admin@alluneed.com`
- **Password:** `admin123`
- **Role:** Admin
- **Name:** Admin User
- **Position:** System Administrator

### 2. Super Admin User
- **Email:** `superadmin@alluneed.com`
- **Password:** `super123`
- **Role:** Super Admin
- **Name:** Super Admin
- **Position:** Super Administrator

### 3. Reporter User
- **Email:** `reporter@alluneed.com`
- **Password:** `reporter123`
- **Role:** Reporter
- **Name:** Reporter User
- **Position:** Reporter

### 4. Demo User
- **Email:** `demo@alluneed.com`
- **Password:** `demo123`
- **Role:** Admin
- **Name:** Demo User
- **Position:** Demo User

## Features

- **Mock Authentication:** All login/logout functionality works with mock data
- **Mock API Calls:** All CRUD operations (GET, POST, PUT, DELETE) are simulated
- **Mock Data:** Sample data for users, campaigns, agencies, and references
- **File Upload Simulation:** Image and file uploads return mock URLs
- **Token Management:** JWT-like tokens are generated and managed locally

## Development Notes

- The mock system simulates API delays (500ms-1000ms) for realistic behavior
- All data is stored in memory and resets when the page is refreshed
- You can modify the mock data in `src/utils/mockData.js`
- The system is ready for you to develop a new backend in any language

## Next Steps

1. Use these credentials to test the frontend functionality
2. Develop your new backend API
3. Replace the mock functions in `src/auth/Api.js` with real API calls
4. Update the authentication flow in `src/sections/auth/AuthLoginForm.js`

## File Structure

- `src/utils/mockData.js` - Contains all mock data and authentication functions
- `src/auth/Api.js` - Mock API handlers for all CRUD operations
- `src/sections/auth/AuthLoginForm.js` - Updated to use mock authentication
- `src/layouts/dashboard/DashboardLayout.js` - Updated to use mock user info 