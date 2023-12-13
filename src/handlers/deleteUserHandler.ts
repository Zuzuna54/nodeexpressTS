import { Request, Response } from 'express';
import Logger from '../logger/Logger';
import userService from '../sqlCalls/userService/userService';


const deleteUserHandler = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        //Validate Id exists
        if (!id) {

            Logger.error(`Invalid input: id: ${id}\n`);
            res.status(400).json({ error: 'Invalid input' });
            return;

        }

        //Delete user
        await userService.deleteUser(id).then((user: any) => {

            if (user.length > 0) {

                Logger.info(`User deleted\n`);
                res.status(200).send({ message: 'User deleted', result: "success" });
                return;

            } else {

                Logger.error(`User does not exist\n`);
                res.status(400).send({ message: 'User does not exist' });
                return;

            }

        }).catch((error: any) => {

            Logger.error(`Error deleting user: ${error}\n`);
            res.status(500).send({ message: 'Internal Server Error' });
            return;

        });

    } catch (error) {

        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

export default deleteUserHandler;
