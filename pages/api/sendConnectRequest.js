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
            toEmail,
            fromName,
            fromEmail,
            message,
            phoneNumber,
            contactMethods
        } = req?.body || {};

        const client = nodemailer.createTransport(sgTransport(options));

        const email = {
            from: 'scottgourley9@gmail.com',
            to: toEmail,
            subject: 'Briidge Connection Request',
            html: `
                <div style="display: flex;align-items: center"><b>From:&nbsp;</b>${fromName}</div><br>
                <div style="display: flex;align-items: center"><b>Message:&nbsp;</b>${message}</div><br>
                <div style="display: flex;align-items: center"><b>Preferred Contact Methods:</b></div><br>
                ${contactMethods?.useEmail ? `<div style="display: flex;align-items: center"><b>Email:&nbsp;</b>${fromEmail}</div><br>`: ''}
                ${contactMethods?.useText ? `<div style="display: flex;align-items: center"><b>Text:&nbsp;</b>${phoneNumber}</div><br>`: ''}
                ${contactMethods?.useCall ? `<div style="display: flex;align-items: center"><b>Call:&nbsp;</b>${phoneNumber}</div>`: ''}
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
