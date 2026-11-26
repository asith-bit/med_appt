const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'stayhealthy-secret';
const DB_FILE = path.join(__dirname, '..', 'users.json');

// Users are stored in a simple JSON file so the server runs without a database.
const readUsers = () => (fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : []);
const writeUsers = (users) => fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { role, name, phone, email, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Name, email, phone and password are required.' });
  }
  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'A user with this email already exists.' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), role, name, phone, email, password: hashed };
  users.push(user);
  writeUsers(users);
  const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
  res.json({ authtoken, name, phone });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = readUsers().find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }
  const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
  res.json({ authtoken, name: user.name, phone: user.phone });
});

// Middleware: check the JWT sent in the Authorization header
const fetchUser = (req, res, next) => {
  const header = req.header('Authorization') || '';
  const token = header.replace('Bearer ', '');
  try {
    req.userId = jwt.verify(token, JWT_SECRET).user.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please log in again.' });
  }
};

// GET /api/auth/user - details of the logged-in user
router.get('/user', fetchUser, (req, res) => {
  const user = readUsers().find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ name: user.name, email: user.email, phone: user.phone, role: user.role });
});

// PUT /api/auth/user - update name and phone number
router.put('/user', fetchUser, (req, res) => {
  const { name, phone } = req.body;
  if (!name || !/^[0-9]{10}$/.test(phone || '')) {
    return res.status(400).json({ error: 'Name and a 10-digit phone number are required.' });
  }
  const users = readUsers();
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  user.name = name;
  user.phone = phone;
  writeUsers(users);
  res.json({ name: user.name, email: user.email, phone: user.phone });
});

module.exports = router;
