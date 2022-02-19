import { Pool } from 'pg';

const pool = new Pool({
    ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export const addUser = async body => {
    let dbResponse = null;

    const {
        user: {
            email,
            first_name,
            last_name,
            picture,
            sub
        },
        onBoardState: {
            type,
            investor,
            operator
        }
    } = body || {};

    const authorizedPicture = picture => {
        const authorizedHostnames = ['getbriidge.s3-accelerate.amazonaws.com', 's.gravatar.com', 'lh3.googleusercontent.com', 'media-exp1.licdn.com', 'platform-lookaside.fbsbx.com'];
        const fallbackURL = 'https://getbriidge.s3-accelerate.amazonaws.com/073f282ce936a53931fb3c24114431bb0ecb5c25.png';

        try {
            if (!picture) {
                return fallbackURL;
            }

            const url = new URL(picture);
            if (authorizedHostnames?.includes(url?.hostname)) {
                return picture;
            }

            return fallbackURL;
        } catch (e) {
            return fallbackURL;
        }
    }

    const facebook = type === 'investor' ? investor?.socialMediaLinks?.facebook : operator?.socialMediaLinks?.facebook;
    const linkedin = type === 'investor' ? investor?.socialMediaLinks?.linkedin : operator?.socialMediaLinks?.linkedin;
    const website = type === 'investor' ? investor?.socialMediaLinks?.website : operator?.socialMediaLinks?.website;

    const text = 'INSERT INTO users(email, first_name, last_name, investor, operator, facebook, linkedin, website, picture, sub) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id'
    const values = [email, first_name, last_name, type === 'investor', type === 'operator', facebook, linkedin, website, authorizedPicture(picture), sub];

    try {
        const res = await pool.query(text, values);
        dbResponse = res?.rows?.[0]?.id;
    } catch (error) {
        console.log('error adding user to db: ', error);
        throw error;
    }
    return dbResponse;
};
