const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projektas',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// JWT Secret
const JWT_SECRET = 'your_jwt_secret';

// Middleware for Authentication
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied');
  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}

// ============================
// Renginiai Endpoints
// ============================

// GET all events
app.get('/renginiai', (req, res) => {
  db.query('SELECT * FROM renginiai', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET event by ID
app.get('/renginiai/:id', (req, res) => {
  db.query('SELECT * FROM renginiai WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// CREATE new event
app.post('/renginiai', (req, res) => {
  const { pavadinimas, time, kategorija, img, vieta, ivertis } = req.body;
  db.query(
    'INSERT INTO renginiai (pavadinimas, time, kategorija, img, vieta, ivertis) VALUES (?, ?, ?, ?, ?, ?)',
    [pavadinimas, time, kategorija, img, vieta, ivertis],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// UPDATE event
app.put('/renginiai/:id', (req, res) => {
  const { pavadinimas, time, kategorija, img, vieta, ivertis } = req.body;
  db.query(
    'UPDATE renginiai SET pavadinimas = ?, time = ?, kategorija = ?, img = ?, vieta = ?, ivertis = ? WHERE id = ?',
    [pavadinimas, time, kategorija, img, vieta, ivertis, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json({ updated: true });
    }
  );
});

// DELETE event
app.delete('/renginiai/:id', (req, res) => {
  db.query('DELETE FROM renginiai WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ deleted: true });
  });
});

// ============================
// Vartotojai Endpoints
// ============================

// GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM vartotoajai', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM vartotoajai WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// CREATE user
app.post('/users', async (req, res) => {
  const { username, password, email, roles_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO vartotoajai (username, password, email, roles_id, block) VALUES (?, ?, ?, ?, 0)',
    [username, hashedPassword, email, roles_id],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// UPDATE user
app.put('/users/:id', (req, res) => {
  const { username, email, roles_id, block } = req.body;
  db.query(
    'UPDATE vartotoajai SET username = ?, email = ?, roles_id = ?, block = ? WHERE id = ?',
    [username, email, roles_id, block, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json({ updated: true });
    }
  );
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM vartotoajai WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ deleted: true });
  });
});

// LOGIN user
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM vartotoajai WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length && (await bcrypt.compare(password, results[0].password))) {
      const token = jwt.sign({ id: results[0].id, username: results[0].username }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// ============================
// Roles Endpoints
// ============================

// GET all roles
app.get('/roles', (req, res) => {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ============================

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
