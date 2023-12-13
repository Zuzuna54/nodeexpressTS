import { Request, Response } from 'express';
import { deleteUser, getUser } from '../sqlCalls/userCall';


const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const del = await deleteUser(id);
        
        res.status(200).json({ result: "success",  message: `User with the id: ${id} deleted` })
        const userSearch = await getUser(id);
        if (userSearch.length === 0) {
            console.log('User deleted');
            res.status(200).json({ result: "success",  message: `User with the id: ${id} deleted` }); 
        } else {
            console.log('User not deleted');
            res.status(204).json({ error: 'User not deleted' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default deleteUserHandler;
