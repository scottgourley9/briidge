import { deleteOperator } from '../../db/deleteOperator';

export default async (req, res) => {
    try {
        await deleteOperator(req?.body?.userId, req?.body?.investorId);

        return res.status(200).json('delete operator successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
