import pool from './initialize';

export const updateHasIncompleteInvestors = async data => {
    const {
        id,
        hasIncompleteInvestors
    } = data || {};

    try {
        const text = 'UPDATE users SET has_incomplete_investors = $1 WHERE id = $2';
        const values = [hasIncompleteInvestors, id];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        console.log('error updating user: ', error);
        throw error;
    }
};
