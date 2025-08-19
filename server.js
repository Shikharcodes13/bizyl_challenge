const express = require('express');
const cors = require('cors');
const jobsRoute = require('./jobsRoute');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', jobsRoute);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Job Board API is running' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Board API', 
    endpoints: {
      'GET /api/jobs': 'Get all jobs (sorted by date)',
      'POST /api/jobs': 'Create a new job',
      'GET /health': 'Health check'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Job Board API server running on port ${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/jobs`);
  console.log(`   POST http://localhost:${PORT}/api/jobs`);
  console.log(`   GET  http://localhost:${PORT}/health`);
});
