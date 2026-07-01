import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characterRoutes.js';

const app = express();

// Enable CORS so Vercel can talk to Render
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable JSON body parsing
app.use(express.json());

// THIS IS THE CRUCIAL LINE: It links the /api/characters URL to your routes file
app.use('/api/characters', characterRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the AI Character Backend API!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});