# How to Run the Job Board Application

## Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server
```bash
npm start
```
or for development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 3. Open the Frontend
Open `index.html` in your web browser. You can:
- Double-click the file
- Drag and drop into your browser
- Use a local server (recommended)

#### Option A: Simple HTTP Server (Recommended)
If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Live Server (VS Code Extension)
If using VS Code, install the "Live Server" extension and right-click `index.html` → "Open with Live Server"

## Testing the Application

### Backend API Testing
You can test the API endpoints using curl or a tool like Postman:

```bash
# Get all jobs
curl http://localhost:3001/api/jobs

# Create a new job
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title": "Software Engineer", "type": "full-time", "salary": 95000}'

# Health check
curl http://localhost:3001/health
```

### Frontend Features
- View all jobs (sorted by date, newest first)
- Filter jobs by type (full-time, part-time, remote, all)
- See job count and details
- Retry functionality if API fails

## Troubleshooting

### Port Already in Use
If port 3001 is busy, change it in `server.js`:
```javascript
const PORT = process.env.PORT || 3002; // Change to any available port
```

### CORS Issues
The backend includes CORS middleware, but if you encounter issues, make sure the frontend is accessing the correct API URL in `index.html`.

### API Connection Issues
- Ensure the backend server is running
- Check that the API URL in `index.html` matches your server port
- Verify the server is accessible at `http://localhost:3001`

## Project Structure
```
├── server.js              # Main Express server
├── jobsRoute.js           # Job API routes
├── package.json           # Node.js dependencies
├── index.html             # Frontend with React component
├── JobList.jsx            # React component (for reference)
├── README_Bizyl_Challenge.txt  # Documentation
└── SETUP.md               # This file
```

## Development Notes
- The backend uses in-memory storage (data resets on server restart)
- The frontend uses React via CDN for simplicity
- All API endpoints are prefixed with `/api`
- Jobs are automatically sorted by posted date (newest first)
