import { Request, Response } from 'express';
import userService from '../sqlCalls/userService/userService';
import bcrypt from 'bcrypt';
import Logger from '../logger/Logger';
import {
    validateEmail,
    validateUsername,
    validatePassword,
} from '../utils/utils';



const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { name, email, phone, password } = req.body;

    try {

        // Validate Id exists
        if (!id) {
            Logger.error(`Invalid input: id: ${id}\n`);
            res.status(400).json({ error: 'Invalid input' });
            return;
        }

        //Get User by id
        await userService.getUser(id).then(async (user: any) => {

            if (user.length > 0) {

                //Check if password was sent in request
                if (password) {

                    //check if the fields are empty, if they are pull old user data and replace them with the old data
                    if (!name) {
                        name = user[0].name;
                    }
                    if (!email) {
                        email = user[0].email;
                    }
                    if (!phone) {
                        phone = user[0].phone;
                    }

                    //Validate the user data
                    Logger.info(`Validating the email\n`);
                    const emailValidated: boolean = validateEmail(email);
                    if (!emailValidated) {
                        Logger.error(`Invalid email\n`);
                        res.status(400).send({ message: 'Invalid email' });
                        return;
                    }

                    Logger.info(`Validating the username\n`);
                    const usernameValidated: boolean = validateUsername(name);
                    if (!usernameValidated) {
                        Logger.error(`Invalid username\n`);
                        res.status(400).send({ message: 'Invalid username' });
                        return;
                    }

                    Logger.info(`Validating the password\n`);
                    const passwordValidated: boolean = validatePassword(password);
                    if (!passwordValidated) {
                        Logger.error(`Invalid password\n`);
                        res.status(400).send({ message: 'Invalid password, must be 8 chars or longer' });
                        return;
                    }

                    //Hash password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    //Update user
                    await userService.updateUser(id, name, email, phone, hashedPassword).then((user: any) => {

                        if (user.length > 0) {

                            Logger.info(`User updated\n`);
                            res.status(200).send({ message: 'User updated', result: "success", user: user });
                            return;

                        } else {

                            Logger.error(`Error updating the user\n`);
                            res.status(500).send({ message: 'Error updating the user' });
                            return;

                        }

                    }).catch((error: any) => {

                        Logger.error(`Error updating user: ${error}\n`);
                        res.status(500).send({ message: 'Internal Server Error' });
                        return;

                    });

                } else {

                    //check if the fields are empty, if they are pull old user data and replace them with the old data
                    if (!name) {
                        name = user[0].name;
                    }
                    if (!email) {
                        email = user[0].email;
                    }
                    if (!phone) {
                        phone = user[0].phone;
                    }

                    //Update user
                    await userService.updateUser(id, name, email, phone, password).then((user: any) => {

                        Logger.info(`User updated\n`);
                        res.status(200).send({ message: 'User updated', result: "success", user: user });
                        return;

                    }).catch((error: any) => {

                        Logger.error(`Error updating user: ${error}\n`);
                        res.status(500).send({ message: 'Internal Server Error' });
                        return;

                    });

                }

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

        Logger.error(`Error updating user: ${error}\n`);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

export default updateUserHandler;
