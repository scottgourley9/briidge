import pool from './initialize';

export const getInvestorCount = async () => {
    let dbResponse = [];

    try {
        const text = 'SELECT count(*) AS exact_count FROM investors;';
        const res = await pool.query(text);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting investors count: ', error);
    }

    return dbResponse;
};
