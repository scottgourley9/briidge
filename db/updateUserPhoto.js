import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const updateUserPhoto = async (picture, userId) => {
    try {
        const text = 'UPDATE users SET picture = $1 WHERE id = $2 RETURNING picture';
        const values = [picture, userId];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
