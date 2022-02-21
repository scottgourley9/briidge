import pool from './initialize';

import { updateInvestorValueForUser } from './updateInvestorValueForUser';
import { updateHasIncompleteInvestors } from './updateHasIncompleteInvestors';

export const addInvestor = async (userId, investorData) => {
    const {
        need,
        investmentAmountMin,
        investmentAmountMax,
        investmentCategory,
        preferredLocation,
        investmentType,
        investmentTimeframe,
        idealOperatorDescription
    } = investorData || {};

    const complete = Boolean(need && investmentAmountMin && investmentAmountMax && investmentAmountMax != '9999999999', investmentCategory, preferredLocation, investmentType, investmentTimeframe, idealOperatorDescription);

    const text = 'INSERT INTO investors(need, investment_amount_min, investment_amount_max, investment_category, preferred_location, investment_type, investment_timeframe, ideal_operator_description, user_id, complete) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
    const values = [need, Number(investmentAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(investmentAmountMax?.replace(/[^0-9]/gi, '') || 9999999999), investmentCategory, preferredLocation, investmentType, investmentTimeframe, idealOperatorDescription, userId, complete];

    try {
        const res = await pool.query(text, values);
        updateInvestorValueForUser({ id: userId, investor: true });
        const text2 = 'SELECT COUNT(*) FROM investors WHERE user_id = $1 AND complete = false';
        const values2 = [userId];
        const res2 = await pool.query(text2, values2);
        updateHasIncompleteInvestors({ id: userId, hasIncompleteInvestors: res2?.rows?.[0]?.count != '0' });
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
