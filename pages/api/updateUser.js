import { updateUserById } from '../../db/updateUserById';

export default async (req, res) => {
    try {
        await updateUserById(req?.body || {});

        return res.status(200).json('update successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
