import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

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
