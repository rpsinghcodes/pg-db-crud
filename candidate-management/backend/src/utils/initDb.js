import pool from '../config/db.js';

const initDatabase = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL CHECK (age > 0),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        skills TEXT,
        experience INTEGER CHECK (experience >= 0),
        applied_position VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Applied' CHECK (status IN ('Applied', 'Interviewing', 'Hired', 'Rejected')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
      CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
      CREATE INDEX IF NOT EXISTS idx_candidates_applied_position ON candidates(applied_position);
    `;

    await pool.query(createTableQuery);
    console.log('Candidates table initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default initDatabase;
