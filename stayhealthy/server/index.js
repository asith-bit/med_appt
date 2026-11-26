const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8181;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('StayHealthy server is running'));
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
