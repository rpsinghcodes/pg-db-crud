import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL.trim();



let pool;
try {
  pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false 
    } : false
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

pool.on('connect', () => {
  console.log('✅ PostgreSQL Connection Pool established successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
});

export default pool;
