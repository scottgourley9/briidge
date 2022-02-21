import pool from './initialize';

import { updateOperatorValueForUser } from './updateOperatorValueForUser';
import { updateHasIncompleteOperators } from './updateHasIncompleteOperators';

export const addOperator = async (userId, operatorData) => {
    const {
        need,
        capitalAmountMin,
        capitalAmountMax,
        operatingCategory,
        preferredLocation,
        investmentType,
        timeframe,
        idealInvestorDescription
    } = operatorData || {};

    const complete = Boolean(need && capitalAmountMin && capitalAmountMax && capitalAmountMax != '9999999999', operatingCategory, preferredLocation, investmentType, timeframe, idealInvestorDescription);

    const text = 'INSERT INTO operators(need, capital_amount_min, capital_amount_max, operating_category, preferred_location, investment_type, timeframe, ideal_investor_description, user_id, complete) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
    const values = [need, Number(capitalAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(capitalAmountMax?.replace(/[^0-9]/gi, '') || 9999999999), operatingCategory, preferredLocation, investmentType, timeframe, idealInvestorDescription, userId, complete];

    try {
        const res = await pool.query(text, values);
        updateOperatorValueForUser({ id: userId, operator: true });
        const text2 = 'SELECT COUNT(*) FROM operators WHERE user_id = $1 AND complete = false';
        const values2 = [userId];
        const res2 = await pool.query(text2, values2);
        updateHasIncompleteOperators({ id: userId, hasIncompleteOperators: res2?.rows?.[0]?.count != '0' });
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
