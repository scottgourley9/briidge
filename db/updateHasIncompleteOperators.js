import pool from './initialize';

export const updateHasIncompleteOperators = async data => {
    const {
        id,
        hasIncompleteOperators
    } = data || {};

    try {
        const text = 'UPDATE users SET has_incomplete_operators = $1 WHERE id = $2';
        const values = [hasIncompleteOperators, id];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        console.log('error updating user: ', error);
        throw error;
    }
};
