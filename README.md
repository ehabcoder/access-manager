# Access Manager 

A lightweight “Access Manager” web application for managing API access tokens. Built with React, TypeScript, Tailwind CSS, and Express.js.

![Access Manager Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38bdf8) ![Express](https://img.shields.io/badge/Express-4.18.2-green)

## Features

### Frontend
- **Token Dashboard**: View all API tokens in a clean, organized table
- **Service Information**: Display service name, token, expiry date, and status
- **Smart Filters**: 
  - Search by service name
  - Filter by status (Active/Expired)
- **Visual Indicators**:
  - Color-coded status badges
  - Expiring soon warnings (within 30 days)
  - Statistics cards showing token counts
- **Renew Token**: One-click token renewal functionality
- **Copy to Clipboard**: Quick token copying with visual feedback

### Backend
- **RESTful API**: Express.js server with CORS support
- **Mock Data**: Pre-populated with 10 sample tokens
- **Filtering**: Query parameters for service and status filtering
- **Token Renewal**: POST endpoint for token renewal (stub implementation)

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ehabcoder/Access-Manager-web-app.git
cd access-manager
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both the backend and frontend servers.

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will start on `http://localhost:3000`

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
access-manager/
├── backend/
│   ├── controllers   
|   |   ├── tokensController.js   # Tokens Controller 
│   ├── routes   
|   |   ├── tokensRoute.js        # Tokens Routes
│   ├── .env                      # Environment variables
│   ├── mockData.js               # The dummy data
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express.js API server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx       # App header component
│   │   │   ├── Filters.tsx      # Filter controls
│   │   │   └── TokenTable.tsx   # Token data table
│   │   ├── App.tsx              # Main application component
│   │   ├── main.tsx             # Application entry point
│   │   ├── index.css            # Global styles with Tailwind
│   │   └── types.ts             # TypeScript interfaces
│   ├── index.html
│   ├── package.json             # Frontend dependencies
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── vite.config.ts           # Vite build configuration
└── README.md                    # Project documentation
```

##  API Endpoints

### GET `/api/tokens`
Get all tokens with optional filtering.

**Query Parameters:**
- `service` (optional): Filter by service name (case-insensitive)
- `status` (optional): Filter by status (`Active` or `Expired`)

**Example:**
```bash
# Get all tokens
curl http://localhost:5000/api/tokens

# Get expired tokens only
curl http://localhost:5000/api/tokens?status=Expired

# Search for GitHub tokens
curl http://localhost:5000/api/tokens?service=GitHub
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "serviceName": "GitHub API",
      "token": "ghp_1234567890abcdefghijklmnopqrstuvwxyz",
      "expiryDate": "2025-12-31",
      "status": "Active"
    }
  ]
}
```

### POST `/api/tokens/:id/renew`
Renew a specific token (stub implementation).

**Example:**
```bash
curl -X POST http://localhost:5000/api/tokens/1/renew
```

**Response:**
```json
{
  "success": true,
  "message": "Token for GitHub API has been renewed",
  "data": {
    "id": 1,
    "serviceName": "GitHub API",
    "token": "ghp_1234567890abcdefghijklmnopqrstuvwxyz",
    "expiryDate": "2026-10-02",
    "status": "Active"
  }
}
```


##  UI Features

### Statistics Dashboard
Three cards showing:
- **Total Tokens**: Count of all tokens
- **Active Tokens**: Count of active tokens
- **Expired Tokens**: Count of expired tokens

### Filter Controls
- **Search by Service**: Real-time search across service names
- **Filter by Status**: Dropdown to show All/Active/Expired tokens
- **Clear Filters**: Quick reset button

### Token Table
- **Service Name**: With icon indicator
- **Token**: Truncated display with copy-to-clipboard button
- **Expiry Date**: Formatted date with "expiring soon" warning
- **Status**: Color-coded badge (green for Active, red for Expired)
- **Actions**: Renew token button

##  Technologies Used

### Frontend
- **React 18.2**: UI library
- **TypeScript 5.3**: Type-safe JavaScript
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Vite 5**: Fast build tool and dev server

### Backend
- **Express.js 4.18**: Web framework for Node.js
- **CORS**: Cross-origin resource sharing
- **Nodemon**: Auto-restart during development

## Development Notes

### Mock Data
The backend includes 10 pre-populated tokens covering various services:
- GitHub API
- Stripe Payment API
- AWS S3
- Google Analytics
- Slack API
- SendGrid Email
- Twilio SMS
- MongoDB Atlas
- OpenAI API
- Firebase

### Token Renewal
The renewal functionality is a **stub implementation** that:
- Accepts POST requests to renew tokens
- Returns success message
- Extends expiry date by 1 year
- In production, this would integrate with actual service APIs

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Build output will be in `frontend/dist/`

### Backend
The backend is production-ready as-is. For deployment:
```bash
cd backend
npm start
```

## Contact

You can contact me via:
email: ehabr518@gmail.com
linkedin: https://www.linkedin.com/in/ehabcoder/

---

