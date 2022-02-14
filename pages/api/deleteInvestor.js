import { deleteInvestor } from '../../db/deleteInvestor';

export default async (req, res) => {
    try {
        await deleteInvestor(req?.body?.userId, req?.body?.investorId);

        return res.status(200).json('delete investor successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
