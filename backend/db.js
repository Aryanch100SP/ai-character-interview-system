import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

// Connect using the cloud URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for most cloud databases
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to Cloud Database:', err.stack);
  } else {
    console.log('Successfully connected to Neon Cloud Database!');
    release();
  }
});

export default pool;