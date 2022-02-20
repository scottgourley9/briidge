import pool from './initialize';

export const getUserById = async id => {
    let dbResponse = [];

    try {
        const text = 'SELECT * from users where id = $1';
        const values = [id];
        const res = await pool.query(text, values);
        dbResponse = res?.rows?.[0];
    } catch (error) {
        console.log('error getting users from db: ', error);
    }

    return dbResponse;
};
