const express = require('express');
const db = require('../backend/config/db');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User created', userId: result.insertId });
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is now running on port ${PORT}`);
});