import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const getUserBySub = async sub => {
    const startTime = (new Date()).getTime();
    let dbResponse = [];

    try {
        const text = 'SELECT * from users where sub = $1';
        const values = [sub];
        const res = await pool.query(text, values);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
