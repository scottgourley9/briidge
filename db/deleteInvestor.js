import pool from './initialize';

import { updateInvestorValueForUser } from './updateInvestorValueForUser';

export const deleteInvestor = async (userId, investorId) => {
    const text = 'DELETE FROM investors WHERE user_id = $1 AND id=$2';
    const values = [userId, investorId];

    try {
        const res = await pool.query(text, values);
        const text2 = 'SELECT COUNT(*) FROM investors WHERE user_id = $1';
        const values2 = [userId];
        const res2 = await pool.query(text2, values2);
        if ((res2?.rows?.[0]?.count) == '0') {
            updateInvestorValueForUser({ id: userId, investor: false });
        }

        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
