import { Client } from 'pg';

export const getAllInvestors = async (offset, limit) => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const text = `
            SELECT * FROM users, investors WHERE users.investor = true AND users.id = investors.user_id ORDER BY user_last_edit_date OFFSET $1 LIMIT $2;
        `;
        const values = [offset, limit];
        const res = await client.query(text, values);
        dbResponse = res?.rows;
        await client.end();
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
