import { addInvestor } from '../../db/addInvestor';

export default async (req, res) => {
    try {
        await addInvestor(req?.body?.userId, req?.body);

        return res.status(200).json('add investor successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
