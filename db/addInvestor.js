import pool from './initialize';

import { updateInvestorValueForUser } from './updateInvestorValueForUser';

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

    const text = 'INSERT INTO investors(need, investment_amount_min, investment_amount_max, investment_category, preferred_location, investment_type, investment_timeframe, ideal_operator_description, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
    const values = [need, Number(investmentAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(investmentAmountMax?.replace(/[^0-9]/gi, '') || 9999999999), investmentCategory, preferredLocation, investmentType, investmentTimeframe, idealOperatorDescription, userId];

    try {
        const res = await pool.query(text, values);
        updateInvestorValueForUser({ id: userId, investor: true });
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
