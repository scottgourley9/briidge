import { getAllOperators } from '../../db/getAllOperators';

export default async (req, res) => {
    try {
        const {
            offset,
            limit,
            sortBy,
            filterBy,
            searchBy
        } = req.body || {};

        const filteredOperators = await getAllOperators(offset, limit, sortBy, filterBy, searchBy);

        return res.status(200).json(filteredOperators);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
