import { updateInvestorById } from '../../db/updateInvestorById';

export default async (req, res) => {
    try {
        await updateInvestorById(req?.body?.id, req?.body);

        return res.status(200).json('update successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
