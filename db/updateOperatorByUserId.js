import { Client } from 'pg';

export const updateOperatorByUserId = async (existingOperatorData, newData) => {
    let dbResponse = [];

    const {
        onBoardState: {
            operator
        }
    } = newData || {};

    try {
        const client = new Client();
        await client.connect();
        const text = 'UPDATE operators SET need = $1, capital_amount_min = $2, capital_amount_max = $3, operating_category = $4, preferred_location = $5, investment_type = $6, timeframe = $7, ideal_investor_description = $8 WHERE user_id = $9 RETURNING id';
        const values = [operator?.need, operator?.capitalAmountMin, operator?.capitalAmountMax, operator?.operatingCategory, operator?.preferredLocation, operator?.investmentType, operator?.timeframe, operator?.idealInvestorDescription, existingOperatorData?.user_id];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error updating operator: ', error);
    }

    return dbResponse;
};
