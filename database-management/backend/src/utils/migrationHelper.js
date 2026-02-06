import { exec } from 'child_process';
import 'dotenv/config';

/**
 * Parses DATABASE_URL or uses individual environment variables
 * @returns {Object} Database connection parameters
 */
const getDbConfig = () => {
    // If DATABASE_URL is provided, parse it
    if (process.env.DATABASE_URL) {
        try {
            const url = new URL(process.env.DATABASE_URL);
            return {
                host: url.hostname,
                port: url.port || '5432',
                user: url.username,
                password: url.password
            };
        } catch (error) {
            console.error('Error parsing DATABASE_URL:', error.message);
            throw new Error('Invalid DATABASE_URL format');
        }
    }
    
    // Fallback to individual environment variables
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
        throw new Error('Database configuration missing. Provide either DATABASE_URL or DB_HOST, DB_USER, and DB_PASSWORD');
    }
    
    return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || '5432',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    };
};

/**
 * Executes a full migration using pg_dump and psql
 * All database credentials are handled server-side only
 * @param {string} sourceDb - The database to copy from
 * @param {string} targetDb - The database to copy into
 * @returns {Promise}
 */
export const migrateData = (sourceDb, targetDb) => {
    return new Promise((resolve, reject) => {
        try {
            // Get database configuration (handled server-side only)
            const dbConfig = getDbConfig();
            
            // Construct the shell command using server-side credentials
            // -h: host, -p: port, -U: user
            const cmd = `pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.user} "${sourceDb}" | psql -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.user} "${targetDb}"`;

            // Set PGPASSWORD in the child process environment to avoid manual entry
            // This ensures credentials are never exposed in command line or logs
            const env = { 
                ...process.env, 
                PGPASSWORD: dbConfig.password 
            };

            console.log(`Starting migration: ${sourceDb} -> ${targetDb}...`);

            exec(cmd, { env }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Migration Error: ${stderr}`);
                    return reject(new Error(stderr || error.message));
                }
                console.log(`Migration logic finished for ${targetDb}`);
                resolve(stdout);
            });
        } catch (error) {
            reject(error);
        }
    });
};