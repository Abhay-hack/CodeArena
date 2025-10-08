const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const judgeRoutes = require('./routes/judge');

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://code-arena-olive.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// --- Route: Fetch Codeforces Problem using official API ---
app.get('/api/codeforces/:contestId/:index', async (req, res) => {
  const { contestId, index } = req.params;

  try {
    // Fetch all problems from Codeforces API
    const apiUrl = 'https://codeforces.com/api/problemset.problems';
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(500).json({ error: 'Failed to fetch problems from Codeforces API.' });
    }

    // Find the specific problem
    const problem = data.result.problems.find(
      p => p.contestId.toString() === contestId && p.index === index
    );

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found in Codeforces API.' });
    }

    // Send the simplified problem data
    res.json({
      title: problem.name,
      difficulty: problem.rating || 'Unrated',
      tags: problem.tags || [],
      contestId: problem.contestId,
      index: problem.index,
      description: `Problem from Codeforces contest ${problem.contestId}, index ${problem.index}. View full statement and sample tests on Codeforces: https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
      sampleInput: '',
      sampleOutput: ''
    });

  } catch (err) {
    console.error('Error fetching Codeforces problem:', err.stack || err);
    res.status(500).json({ error: 'Failed to fetch problem from Codeforces API.' });
  }
});

// Judge routes
app.use('/api/judge', judgeRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
