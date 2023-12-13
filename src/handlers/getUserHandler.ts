import { Request, Response } from 'express';
import userService from '../sqlCalls/userService/userService';
import Logger from '../logger/Logger';

const getUserHandler = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        // Validate Id exists
        if (!id) {

            Logger.error(`Invalid input: id: ${id}\n`);
            res.status(400).json({ error: 'Invalid input' });
            return;

        }

        //Get user
        await userService.getUser(id).then((user: any) => {

            if (user.length > 0) {

                Logger.info(`User found\n`);
                res.status(200).send({ message: 'User found', user: user, result: "success" });
                return;

            } else {

                Logger.error(`User does not exist\n`);
                res.status(400).send({ message: 'User does not exist' });
                return;

            }

        }).catch((error: any) => {

            Logger.error(`Error getting user: ${error}\n`);
            res.status(500).send({ message: 'Internal Server Error' });
            return;

        });
    } catch (error) {

        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

};

export default getUserHandler;