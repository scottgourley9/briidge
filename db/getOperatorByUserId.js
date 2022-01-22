import { Client } from 'pg';

export const getOperatorByUserId = async (userId, getAll) => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const text = 'SELECT * FROM operators WHERE user_id = $1 ORDER BY operator_last_edit_date';
        const values = [userId];
        const res = await client.query(text, values);
        if (getAll) {
            dbResponse = res?.rows;
        } else {
            dbResponse = res?.rows?.[0];
        }
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
