import { getAllUserData } from '../../helpers/getAllUserData';

export default async (req, res) => {
    try {
        const userData = await getAllUserData(req?.body?.userId);

        return res.status(200).json(userData);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
