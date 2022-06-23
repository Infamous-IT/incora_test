const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const routes = require('./routes/user');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// routes
app.use('/api/user', usersRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}!`);
})