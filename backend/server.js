import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characterRoutes.js';

const app = express();

// 1. ENABLE CORS FOR ALL DOMAINS (Crucial for Vercel preview links)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. ENABLE JSON BODY PARSING (Crucial so req.body isn't undefined)
app.use(express.json());

// 3. Your routes
app.use('/api/characters', characterRoutes);

// Default status route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the AI Character Backend API!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});