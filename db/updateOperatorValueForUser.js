import pool from './initialize';

export const updateOperatorValueForUser = async data => {
    const {
        id,
        operator
    } = data || {};

    try {
        const text = 'UPDATE users SET operator = $1 WHERE id = $2';
        const values = [operator, id];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        console.log('error updating user: ', error);
        throw error;
    }
};
