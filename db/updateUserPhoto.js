import pool from './initialize';

export const updateUserPhoto = async (picture, userId) => {
    try {
        const text = 'UPDATE users SET picture = $1 WHERE id = $2 RETURNING picture';
        const values = [picture, userId];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
