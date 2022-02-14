import { Client } from 'pg';

export const deleteInvestor = async (userId, investorId) => {
    const text = 'DELETE FROM investors WHERE user_id = $1 AND id=$2';
    const values = [userId, investorId];

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
