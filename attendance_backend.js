// Simple Express server for attendance
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// In-memory list of present students
const present = [];

// Serve the frontend
app.use(express.static(path.join(__dirname, '.')));

// API endpoint to mark attendance
app.post('/mark', (req, res) => {
  const name = (req.body && req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Name is required' });
  present.push(name);
  res.status(201).json({ message: 'Marked present', present });
});

// API endpoint to get present students
app.get('/present', (req, res) => {
  res.json(present);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Attendance backend running on port ${port}`));
