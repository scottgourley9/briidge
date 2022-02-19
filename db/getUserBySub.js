import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const getUserBySub = async sub => {
    const startTime = (new Date()).getTime();
    console.log('getUserBySub START');
    let dbResponse = [];

    try {
        console.log('getUserBySub connect: ', (new Date()).getTime() - startTime);
        const text = 'SELECT * from users where sub = $1';
        const values = [sub];
        const res = await pool.query(text, values);
        console.log('getUserBySub query: ', (new Date()).getTime() - startTime);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    console.log('getUserBySub END: ', (new Date()).getTime() - startTime);

    return dbResponse;
};
