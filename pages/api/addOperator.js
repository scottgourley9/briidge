import { addOperator } from '../../db/addOperator';

export default async (req, res) => {
    try {
        await addOperator(req?.body?.userId, req?.body);

        return res.status(200).json('add investor successful');
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
