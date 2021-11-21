import { Client } from 'pg';

export const getAllUsers = async () => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const res = await client.query('SELECT * from users');
        dbResponse = res;
        console.log(dbResponse);
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }
    return dbResponse;
};
