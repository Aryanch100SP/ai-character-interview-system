import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import characterRoutes from './routes/characterRoutes.js'; // <-- Import the new routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the AI Character Backend API!" });
});

// Connect the character routes to the /api/characters URL path
app.use('/api/characters', characterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});