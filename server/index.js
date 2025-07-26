// backend/index.js
const express = require('express');
const cors = require('cors');
const problems = require('./data/problems');

const app = express();
app.use(cors());

// Get all problems
app.get('/api/problem', (req, res) => {
  res.json(problems);
});

// Get single problem by id
app.get('/api/problem/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const problem = problems.find(p => p.id === id);

  if (problem) {
    res.json(problem);
  } else {
    res.status(404).json({ message: 'Problem not found' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
