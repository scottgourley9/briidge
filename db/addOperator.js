import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

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

    const text = 'INSERT INTO operators(need, capital_amount_min, capital_amount_max, operating_category, preferred_location, investment_type, timeframe, ideal_investor_description, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
    const values = [need, Number(capitalAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(capitalAmountMax?.replace(/[^0-9]/gi, '') || 9999999999), operatingCategory, preferredLocation, investmentType, timeframe, idealInvestorDescription, userId];

    try {
        const res = await pool.query(text, values);
        const dbResponse = res?.rows?.[0];

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
