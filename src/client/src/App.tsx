import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs/').then(({ data }) => setJobs(data.data));
  }, []);

  return (
    <>
      <Table responsive style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>#</th>
            <th>Client</th>
            <th>Location</th>
            <th>Description</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr>
              <td>{new Date(job['date']).toLocaleDateString()}</td>
              <td>{job['jobID']}</td>
              <td>{job['client']['name']}</td>
              <td>{job['location']['city']}</td>
              <td>{job['description']}</td>
              <td>{job['notes']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
