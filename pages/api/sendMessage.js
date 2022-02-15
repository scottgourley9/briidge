import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

export default async (req, res) => {
    try {

        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_KEY
            }
        }

        const {
            fromName,
            fromEmail,
            message
        } = req?.body || {};

        const client = nodemailer.createTransport(sgTransport(options));

        const email = {
            from: 'info@getbriidge.com',
            to: 'info@getbriidge.com',
            subject: 'Briidge Contact Us Message',
            html: `
                <div style="display: flex;align-items: center"><b>Name:&nbsp;</b>${fromName}</div><br>
                <div style="display: flex;align-items: center"><b>Email:&nbsp;</b>${fromEmail}</div><br>
                <div style="display: flex;align-items: center"><b>Message:&nbsp;</b>${message}</div><br>
            `,
        };

        const promiseResolution = await new Promise((resolve, reject) => {
            client.sendMail(email, (err, info) => {
                if (err) {
                    reject(err);
                }

                resolve(info);
            });
        });

        return res.status(200).json('Success');
    } catch (e) {
        return res.status(500).json(e?.message);
    }
}
