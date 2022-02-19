import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const getOperatorByUserId = async (userId, getAll) => {
    let dbResponse = [];

    try {
        const text = 'SELECT * FROM operators WHERE user_id = $1 ORDER BY operator_last_edit_date DESC';
        const values = [userId];
        const res = await pool.query(text, values);
        if (getAll) {
            dbResponse = res?.rows;
        } else {
            dbResponse = res?.rows?.[0];
        }
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
