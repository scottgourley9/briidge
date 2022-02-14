import { Client } from 'pg';

export const updateOperatorById = async (operatorId, operator) => {
    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' });
        await client.connect();
        const text = 'UPDATE operators SET need = $1, capital_amount_min = $2, capital_amount_max = $3, operating_category = $4, preferred_location = $5, investment_type = $6, timeframe = $7, ideal_investor_description = $8 WHERE id = $9 RETURNING id';
        const values = [operator?.need, Number(operator?.capitalAmountMin?.replace(/[^0-9]/gi, '') || 0), Number(operator?.capitalAmountMax?.replace(/[^0-9]/gi, '')) || 9999999999, operator?.operatingCategory, operator?.preferredLocation, operator?.investmentType, operator?.timeframe, operator?.idealInvestorDescription, operatorId];
        const res = await client.query(text, values);
        const dbResponse = res?.rows?.[0];
        await client.end();

        return dbResponse || {};
    } catch (error) {
        throw error;
    }
};
