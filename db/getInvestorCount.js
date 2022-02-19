import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const getInvestorCount = async () => {
    let dbResponse = [];

    try {
        const text = 'SELECT count(*) AS exact_count FROM investors;';
        const res = await pool.query(text);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting investors count: ', error);
    }

    return dbResponse;
};
