import { Client } from 'pg';

export const getInvestorCount = async () => {
    let dbResponse = [];

    try {
        const client = new Client();
        await client.connect();
        const text = 'SELECT count(*) AS exact_count FROM investors;';
        const res = await client.query(text);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error getting investors count: ', error);
    }

    return dbResponse;
};