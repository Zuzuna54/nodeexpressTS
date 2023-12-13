import {
    validateEmail,
    validateUsername,
    validatePassword,
} from '../utils/utils';
import Logger from '../logger/Logger';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserService from '../sqlCalls/userService/userService';


const createUserHandler = async (req: Request, res: Response): Promise<void> => {


    const { name, email, phone, password } = req.body;

    // Validate that name, email, and phone are provided in the request body
    if (!name || !email || !phone) {

        Logger.error(`Invalid input: name: ${name}, email: ${email}, phone: ${phone}\n`);
        res.status(400).json({ error: 'Invalid input' });

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

    //Check if user already exists
    Logger.info(`Checking if user already exists\n`);
    await UserService.getUserByUsername(name).then((user: any) => {

        if (user.length > 0) {

            Logger.error(`User already exists\n`);
            res.status(400).send({ message: 'User already exists' });
            return;

        } else {

            createNewUser(res, name, email, phone, password);

        }

    }).catch((error: any) => {

        Logger.error(`Error checking if user already exists: ${error}\n`);
        res.status(500).send({ message: 'Error checking if user already exists' });
        return;

    });
};

//Create a new user
const createNewUser = async (res: Response, name: string, email: string, phone: string, password: string): Promise<any> => {

    //Generate UUID
    const id: string = uuidv4();

    //Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    //Create the user
    const user: any = await UserService.createUser(name, email, phone, hashedPassword, id).then((user: any) => {

        if (user.length > 0) {

            Logger.info(`User created successfully\n`);

            //Get the user from the response
            const newUser: any = user[0];

            //Send the user in the response
            console.log(`Sending the user in the response\n`);
            const response: Record<string, any> = {
                result: "success",
                user: newUser,
                message: 'User created',
                statusCode: 200,
            };


            res.status(200).send(response);
            return;

        } else {

            Logger.error(`Error creating user\n`);
            res.status(500).send({ message: 'Error creating user' });
            return;
        }


    }).catch((error: any) => {

        res.status(500).send({ message: 'Error creating user' });
        Logger.error(`Error creating user: ${error}\n`);
        return error;

    });

    return user;

}

export default createUserHandler;
