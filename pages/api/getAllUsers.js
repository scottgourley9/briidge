import { getAllUsers } from '../../db/getAllUsers';

export default async function handler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}
