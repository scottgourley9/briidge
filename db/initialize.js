import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000
});

pool.on('error', (err, client) => {
    console.error('Unexpected db error', err);
});

export default pool;
