import { Client } from 'pg';

export const getUserBySub = async sub => {
    const startTime = (new Date()).getTime();
    console.log('getUserBySub START');
    let dbResponse = [];

    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null });
        await client.connect();
        console.log('getUserBySub connect: ', (new Date()).getTime() - startTime);
        const text = 'SELECT * from users where sub = $1';
        const values = [sub];
        const res = await client.query(text, values);
        console.log('getUserBySub query: ', (new Date()).getTime() - startTime);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    console.log('getUserBySub END: ', (new Date()).getTime() - startTime);

    return dbResponse;
};
