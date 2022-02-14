import { Client } from 'pg';

export const deleteOperator = async (userId, operatorId) => {
    const text = 'DELETE FROM operators WHERE user_id = $1 AND id=$2';
    const values = [userId, operatorId];

    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null });
        await client.connect();
        const res = await client.query(text, values);
        const dbResponse = res?.rows?.[0];
        await client.end();

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
