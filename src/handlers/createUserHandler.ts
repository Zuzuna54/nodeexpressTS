import { Request, Response } from 'express';
import { createUser } from '../sqlCalls/userCall';


const createUserHandler = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;

    // Validate that name, email, and phone are provided in the request body
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Invalid input' });
    }


    try {
        const user = await createUser(name, email, phone);
        res.status(200).json({ result: "success", user: user[0], message: "User created successfully" });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default createUserHandler;
