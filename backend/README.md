# Meghana Portfolio Backend

This backend server handles the contact form functionality for Meghana's portfolio website.

## Features

- Contact form submission with email notifications
- Input validation and error handling
- CORS enabled for frontend integration
- Health check endpoint

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your email configuration:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

### 3. Gmail Setup (for email sending)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env` file

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

## Deployment

### For Vercel Deployment
1. Create `vercel.json` in the root directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    }
  ]
}
```

2. Deploy to Vercel with the backend included.

### For Other Hosting
- Ensure your hosting supports Node.js
- Install dependencies and start the server
- Configure firewall to allow traffic on your chosen port

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Consider rate limiting for production use
- Validate all user inputs
