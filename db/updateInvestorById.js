import pool from './initialize';

export const updateInvestorById = async (investorId, investor) => {
    try {
        const text = 'UPDATE investors SET need = $1, investment_amount_min = $2, investment_amount_max = $3, investment_category = $4, preferred_location = $5, investment_type = $6, investment_timeframe = $7, ideal_operator_description = $8 WHERE id = $9 RETURNING id';
        const values = [investor?.need, Number(investor?.investmentAmountMin?.replace(/[^0-9]/gi, '')) || 0, Number(investor?.investmentAmountMax?.replace(/[^0-9]/gi, '')) || 9999999999, investor?.investmentCategory, investor?.preferredLocation, investor?.investmentType, investor?.investmentTimeframe, investor?.idealOperatorDescription, investorId];
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
