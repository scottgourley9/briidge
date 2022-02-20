import pool from './initialize';

import { updateOperatorValueForUser } from './updateOperatorValueForUser';

export const deleteOperator = async (userId, operatorId) => {
    const text = 'DELETE FROM operators WHERE user_id = $1 AND id=$2';
    const values = [userId, operatorId];

    try {
        const res = await pool.query(text, values);
        const text2 = 'SELECT COUNT(*) FROM operators WHERE user_id = $1';
        const values2 = [userId];
        const res2 = await pool.query(text2, values2);
        if ((res2?.rows?.[0]?.count) == '0') {
            updateOperatorValueForUser({ id: userId, operator: false });
        }

        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
