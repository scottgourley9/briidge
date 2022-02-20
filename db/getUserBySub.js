import pool from './initialize';

export const getUserBySub = async sub => {
    const startTime = (new Date()).getTime();
    let dbResponse = [];

    try {
        const text = 'SELECT * from users where sub = $1';
        const values = [sub];
        const res = await pool.query(text, values);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
