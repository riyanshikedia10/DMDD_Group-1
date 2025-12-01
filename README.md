# DMDD_Group-1

Food Supply Chain Traceability System

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- SQL Server database (for backend)

## Quick Start

### Option 1: Use the start script (Recommended)

```bash
./start.sh
```

### Option 2: Manual start

**Terminal 1 - Backend:**
```bash
cd backend
npm install  # if you haven't already
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install  # if you haven't already
npm run dev
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with:

```env
PORT=5000
DB_SERVER=your_server
DB_DATABASE=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=1433
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Project Structure

- `backend/` - Express.js API server
- `frontend/` - React + Vite application