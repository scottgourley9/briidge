import { Client } from 'pg';

export const getUserById = async id => {
    let dbResponse = [];

    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' });
        await client.connect();
        const text = 'SELECT * from users where id = $1';
        const values = [id];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
