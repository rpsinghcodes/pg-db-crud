import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

console.log({dbName: process.env.DATABASE_URL});
// Use the connectionString instead of individual params
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false 
  } : false
});

pool.on('connect', () => {
  console.log('PostgreSQL Connection Pool established successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  // Optional: Don't exit in production unless it's a fatal startup error
});

export default pool;