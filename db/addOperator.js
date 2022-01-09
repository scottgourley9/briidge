import { Client } from 'pg';

export const addOperator = async (user_id, body) => {
    let dbResponse = null;

    const {
        onBoardState: {
            operator: {
                need,
                capitalAmountMin,
                capitalAmountMax,
                operatingCategory,
                preferredLocation,
                investmentType,
                timeframe,
                idealInvestorDescription
            }
        }
    } = body || {};

    const text = 'INSERT INTO operators(need, capital_amount_min, capital_amount_max, operating_category, preferred_location, investment_type, timeframe, ideal_investor_description, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
    const values = [need, capitalAmountMin, capitalAmountMax, operatingCategory, preferredLocation, investmentType, timeframe, idealInvestorDescription, user_id];

    try {
        const client = new Client();
        await client.connect();
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error adding user to db: ', error);
        throw error;
    }
    return dbResponse;
};
