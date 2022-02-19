import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const updateUserById = async data => {
    const {
        email,
        first_name,
        last_name,
        picture,
        type,
        investor,
        operator,
        id,
        facebook,
        linkedin,
        website
    } = data || {};

    try {
        const text = 'UPDATE users SET email = $1, first_name = $2, last_name = $3, investor = $4, operator = $5, facebook = $6, linkedin = $7, website = $8 WHERE id = $9 RETURNING id';
        const values = [email, first_name, last_name, investor || type === 'investor', operator || type === 'operator', facebook, linkedin, website, id];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        console.log('error updating user: ', error);
        throw error;
    }
};
