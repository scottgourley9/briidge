import { updateOperatorById } from '../../db/updateOperatorById';

export default async (req, res) => {
    try {
        await updateOperatorById(req?.body?.id, req?.body);

        return res.status(200).json('update successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
