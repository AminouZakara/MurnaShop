const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(401).send({ error: 'Invalid email' });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).send({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  });
};