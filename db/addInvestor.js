import { Client } from 'pg';

export const addInvestor = async (user_id, body) => {
    let dbResponse = null;

    const {
        onBoardState: {
            investor: {
                need,
                investmentAmountMin,
                investmentAmountMax,
                investmentCategory,
                preferredLocation,
                investmentType,
                investmentTimeframe,
                idealOperatorDescription
            }
        }
    } = body || {};

    const text = 'INSERT INTO investors(need, investment_amount_min, investment_amount_max, investment_category, preferred_location, investment_type, investment_timeframe, ideal_operator_description, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
    const values = [need, investmentAmountMin, investmentAmountMax, investmentCategory, preferredLocation, investmentType, investmentTimeframe, idealOperatorDescription, user_id];

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
