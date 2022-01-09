import { Client } from 'pg';

export const updateInvestorByUserId = async (existingInvestorData, newData) => {
    let dbResponse = [];

    const {
        onBoardState: {
            investor
        }
    } = newData || {};
    console.log('investor: ', investor);

    try {
        const client = new Client();
        await client.connect();
        const text = 'UPDATE investors SET need = $1, investment_amount_min = $2, investment_amount_max = $3, investment_category = $4, preferred_location = $5, investment_type = $6, investment_timeframe = $7, ideal_operator_description = $8 WHERE user_id = $9 RETURNING id';
        const values = [investor?.need, investor?.investmentAmountMin, investor?.investmentAmountMax, investor?.investmentCategory, investor?.preferredLocation, investor?.investmentType, investor?.investmentTimeframe, investor?.idealOperatorDescription, existingInvestorData?.user_id];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error updating investor: ', error);
    }

    return dbResponse;
};
