import pool from './initialize';

export const updateInvestorValueForUser = async data => {
    const {
        id,
        investor
    } = data || {};

    try {
        const text = 'UPDATE users SET investor = $1 WHERE id = $2';
        const values = [investor, id];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        console.log('error updating user: ', error);
        throw error;
    }
};
