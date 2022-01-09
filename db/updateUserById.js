import { Client } from 'pg';

export const updateUserById = async (existingUserData, newData) => {
    let dbResponse = [];

    const {
        user: {
            email,
            first_name,
            last_name,
            picture
        },
        onBoardState: {
            type,
            investor,
            operator
        }
    } = newData || {};

    const facebook = type === 'investor' ? investor?.socialMediaLinks?.facebook : operator?.socialMediaLinks?.facebook;
    const linkedin = type === 'investor' ? investor?.socialMediaLinks?.linkedin : operator?.socialMediaLinks?.linkedin;
    const website = type === 'investor' ? investor?.socialMediaLinks?.website : operator?.socialMediaLinks?.website;

    try {
        const client = new Client();
        await client.connect();
        const text = 'UPDATE users SET investor = $1, operator = $2, facebook = $3, linkedin = $4, website = $5 WHERE id = $6 RETURNING id';
        const values = [existingUserData?.investor || type === 'investor', existingUserData?.operator || type === 'operator', facebook, linkedin, website, existingUserData?.id];
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0];
        await client.end();
    } catch (error) {
        console.log('error updating user: ', error);
    }

    return dbResponse;
};
