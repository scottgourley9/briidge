import { getAllInvestors } from '../../db/getAllInvestors';

export default async (req, res) => {
    try {
        const {
            offset,
            limit,
            sortBy,
            filterBy,
            searchBy
        } = req.body || {};

        const filteredInvestors = await getAllInvestors(offset, limit, sortBy, filterBy, searchBy);

        return res.status(200).json(filteredInvestors);
    } catch (e) {
        return res.status(500).json(e.message);
    }
}
