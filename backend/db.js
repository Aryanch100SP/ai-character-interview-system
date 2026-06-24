import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const { Pool } = pkg;

// Create a new connection pool using your .env credentials
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Test the connection immediately
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL database!');
    release();
  }
});

export default pool;