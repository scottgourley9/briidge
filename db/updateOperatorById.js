import pool from './initialize';
import { updateHasIncompleteOperators } from './updateHasIncompleteOperators';

export const updateOperatorById = async (operatorId, operator) => {
    const complete = Boolean(operator?.need && operator?.capitalAmountMin && operator?.capitalAmountMax && operator?.capitalAmountMax != '9999999999' && operator?.operatingCategory && operator?.preferredLocation && operator?.investmentType && operator?.timeframe && operator?.idealInvestorDescription);

    try {
        const text = 'UPDATE operators SET need = $1, capital_amount_min = $2, capital_amount_max = $3, operating_category = $4, preferred_location = $5, investment_type = $6, timeframe = $7, ideal_investor_description = $8 WHERE id = $9 RETURNING id, user_id';
        const values = [operator?.need, Number(operator?.capitalAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(operator?.capitalAmountMax?.replace(/[^0-9]/gi, '')) || 9999999999, operator?.operatingCategory, operator?.preferredLocation, operator?.investmentType, operator?.timeframe, operator?.idealInvestorDescription, operatorId];
        const res = await pool.query(text, values);
        const text2 = 'SELECT COUNT(*) FROM operators WHERE user_id = $1 AND complete = false';
        const values2 = [res?.rows?.[0]?.user_id];
        const res2 = await pool.query(text2, values2);
        updateHasIncompleteOperators({ id: res?.rows?.[0]?.user_id, hasIncompleteOperators: res2?.rows?.[0]?.count != '0' });
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
