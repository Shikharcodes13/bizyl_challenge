// jobsRoute.js
// Sanitized for Bizyl Tech Challenge

const express = require('express');
const router = express.Router();

// Dummy job data (no real user/company data)
let jobs = [
  { id: 1, title: "Frontend Developer", type: "full-time", salary: 80000, postedDate: "2024-08-01" },
  { id: 2, title: "Backend Developer", type: "part-time", salary: 40000, postedDate: "2024-08-02" },
  { id: 3, title: "Full Stack Dev", type: "remote", salary: 90000, postedDate: "2024-08-03" }
];

// Helper function to sort jobs by postedDate (newest first)
const sortJobsByDate = (jobsArray) => {
  return jobsArray.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
};

// Helper function to validate job data
const validateJobData = (jobData) => {
  const errors = [];
  
  if (!jobData.title || typeof jobData.title !== 'string' || jobData.title.trim() === '') {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (jobData.salary === undefined || jobData.salary === null) {
    errors.push('Salary is required');
  } else if (typeof jobData.salary !== 'number' || isNaN(jobData.salary)) {
    errors.push('Salary must be a valid number');
  } else if (jobData.salary < 0) {
    errors.push('Salary cannot be negative');
  }
  
  return errors;
};

// Helper function to generate unique ID
const generateJobId = () => {
  return Math.max(...jobs.map(job => job.id), 0) + 1;
};

// GET /jobs - Returns jobs sorted by postedDate (newest first)
router.get('/jobs', (req, res) => {
  try {
    const sortedJobs = sortJobsByDate([...jobs]);
    res.json(sortedJobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST /jobs - Creates a new job with validation
router.post('/jobs', (req, res) => {
  try {
    const { title, type, salary, postedDate } = req.body;
    
    // Validate required fields
    const validationErrors = validateJobData({ title, salary });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationErrors 
      });
    }
    
    // Create new job with default values for optional fields
    const newJob = {
      id: generateJobId(),
      title: title.trim(),
      type: type || 'full-time',
      salary: Number(salary),
      postedDate: postedDate || new Date().toISOString().split('T')[0]
    };
    
    jobs.push(newJob);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

module.exports = router;
