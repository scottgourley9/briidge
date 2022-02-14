import { Client } from 'pg';

export const updateUserPhoto = async (picture, userId) => {
    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null });
        await client.connect();
        const text = 'UPDATE users SET picture = $1 WHERE id = $2 RETURNING picture';
        const values = [picture, userId];
        const res = await client.query(text, values);
        const dbResponse = res?.rows?.[0];
        await client.end();

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
