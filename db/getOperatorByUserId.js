import { Client } from 'pg';

export const getOperatorByUserId = async userId => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const text = 'SELECT * from operators where user_id = $1';
        const values = [userId];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
