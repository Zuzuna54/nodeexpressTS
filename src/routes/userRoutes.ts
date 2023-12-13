import express, { Router } from 'express';
import getUserHandler from '../handlers/getUserHandler';
import createUserHandler from '../handlers/createUserHandler';
import updateUserHandler from '../handlers/updateUserHandler';
import deleteUserHandler from '../handlers/deleteUserHandler';
import Logger from '../logger/Logger';


const createRouter = () => {

    try {

        const router: Router = express.Router();

        router.get('/:id', getUserHandler);
        router.post('/', createUserHandler);
        router.put('/:id', updateUserHandler);
        router.delete('/:id', deleteUserHandler);

        Logger.info('User routes created');
        return router;

    } catch (error: any | Error) {

        Logger.error(error as string);
        throw error;

    }

}

const router = createRouter();

export default router;