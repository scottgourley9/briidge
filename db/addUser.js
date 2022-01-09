import { Client } from 'pg';

export const addUser = async body => {
    let dbResponse = null;

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
    } = body || {};

    const facebook = type === 'investor' ? investor?.socialMediaLinks?.facebook : operator?.socialMediaLinks?.facebook;
    const linkedin = type === 'investor' ? investor?.socialMediaLinks?.linkedin : operator?.socialMediaLinks?.linkedin;
    const website = type === 'investor' ? investor?.socialMediaLinks?.website : operator?.socialMediaLinks?.website;

    const text = 'INSERT INTO users(email, first_name, last_name, investor, operator, facebook, linkedin, website, picture) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id'
    const values = [email, first_name, last_name, type === 'investor', type === 'operator', facebook, linkedin, website, picture];

    try {
        const client = new Client();
        await client.connect();
        const res = await client.query(text, values);
        dbResponse = res?.rows?.[0]?.id;
        await client.end();
    } catch (error) {
        console.log('error adding user to db: ', error);
        throw error;
    }
    return dbResponse;
};
