// JobList.jsx
// Sanitized for Bizyl Tech Challenge

import React, { useEffect, useState, useCallback } from "react";

// Job type options for filtering
const JOB_TYPES = ['all', 'full-time', 'part-time', 'remote'];

// Custom hook for job data management
const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/jobs");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
};

// Filter component for job types
const JobTypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <div className="job-filter">
      <label htmlFor="job-type-filter">Filter by job type: </label>
      <select
        id="job-type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        {JOB_TYPES.map(type => (
          <option key={type} value={type}>
            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

// Job item component
const JobItem = ({ job }) => {
  return (
    <li key={job.id} className="job-item">
      <div className="job-header">
        <strong>{job.title}</strong>
        <span className="job-type">{job.type}</span>
      </div>
      <div className="job-details">
        <span className="salary">${job.salary.toLocaleString()}</span>
        <span className="posted-date">Posted: {job.postedDate}</span>
      </div>
    </li>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="loading">Loading jobs...</div>
);

// Error component
const ErrorMessage = ({ error, onRetry }) => (
  <div className="error">
    <p>Error loading jobs: {error}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

// Main JobList component
const JobList = () => {
  const { jobs, loading, error, refetch } = useJobs();
  const [selectedJobType, setSelectedJobType] = useState('all');

  // Filter jobs based on selected type
  const filteredJobs = jobs.filter(job => 
    selectedJobType === 'all' || job.type === selectedJobType
  );

  const handleJobTypeChange = (newType) => {
    setSelectedJobType(newType);
  };

  return (
    <div className="job-list-container">
      <h2>Job Board</h2>
      
      <JobTypeFilter 
        selectedType={selectedJobType}
        onTypeChange={handleJobTypeChange}
      />
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage error={error} onRetry={refetch} />}
      
      {!loading && !error && (
        <>
          <div className="job-count">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
          <ul className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobItem key={job.id} job={job} />)
            ) : (
              <li className="no-jobs">No jobs found for the selected filter.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobList;
