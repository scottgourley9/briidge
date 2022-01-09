import { Client } from 'pg';

export const getUserByEmail = async email => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const text = 'SELECT * from users where email = $1';
        const values = [email];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
