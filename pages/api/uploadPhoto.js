// Bring in amazon s3 for photo uploading
import AWS from 'aws-sdk';
// Bring in sharp to compress images
import sharp from 'sharp';
import crypto from 'crypto';

import { updateUserPhoto } from '../../db/updateUserPhoto';

AWS.config.update({ accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET, region: process.env.AWS_REG });

const s3 = new AWS.S3();

export default async (req, res) => {
    // photo upload
    try {
        const body = req.body;
        const buf = new Buffer(body?.imageBody?.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const data = await sharp(buf).resize(750, null).rotate().toBuffer();
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${crypto.randomBytes(20).toString('hex')}.${body?.imageExtension}`,
            Body: data,
            ContentType: `image/${body?.imageExtension}`,
            ACL: 'public-read'
        }
        s3.config.endpoint = 's3-accelerate.amazonaws.com';
        s3.upload(params, async (errors, uploadResponse) => {
            if (errors) {
                return res.status(500).send('s3 upload failed');
            } else {
                const photo = await updateUserPhoto(uploadResponse?.Location, body?.userId);

                return res.status(200).json(photo);
            }
        });
    } catch (e) {
        return res.status(500).send('s3 upload failed');
    }
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb'
        }
    }
}
