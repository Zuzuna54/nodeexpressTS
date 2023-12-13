import { Request, Response } from 'express';
import { updateUser } from '../sqlCalls/userService/userService';


const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const user = await updateUser(id, name, email, phone);
        if (!user.length) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ result: "success", userAfterUpdate: user[0], message: "User updated successfully!" });
        }
    } catch (error) {
        console.log(res + " " + error);
        console.log(typeof res)
        console.error('Error updating applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default updateUserHandler;
