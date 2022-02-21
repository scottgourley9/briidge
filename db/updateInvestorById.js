import pool from './initialize';
import { updateHasIncompleteInvestors } from './updateHasIncompleteInvestors';

export const updateInvestorById = async (investorId, investor) => {
    const complete = Boolean(investor?.need && investor?.investmentAmountMin && investor?.investmentAmountMax && investor?.investmentAmountMax != '9999999999' && investor?.investmentCategory && investor?.preferredLocation && investor?.investmentType && investor?.investmentTimeframe && investor?.idealOperatorDescription);

    try {
        const text = 'UPDATE investors SET need = $1, investment_amount_min = $2, investment_amount_max = $3, investment_category = $4, preferred_location = $5, investment_type = $6, investment_timeframe = $7, ideal_operator_description = $8, complete = $9 WHERE id = $10 RETURNING id, user_id';
        const values = [investor?.need, Number(investor?.investmentAmountMin?.replace(/[^0-9]/gi, '')) || 0, Number(investor?.investmentAmountMax?.replace(/[^0-9]/gi, '')) || 9999999999, investor?.investmentCategory, investor?.preferredLocation, investor?.investmentType, investor?.investmentTimeframe, investor?.idealOperatorDescription, complete, investorId];
        const res = await pool.query(text, values);
        const text2 = 'SELECT COUNT(*) FROM investors WHERE user_id = $1 AND complete = false';
        const values2 = [res?.rows?.[0]?.user_id];
        const res2 = await pool.query(text2, values2);
        updateHasIncompleteInvestors({ id: res?.rows?.[0]?.user_id, hasIncompleteInvestors: res2?.rows?.[0]?.count != '0' });
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
