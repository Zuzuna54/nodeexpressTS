import express from 'express';
import getUserHandler from '../handlers/getUserHandler';
import createUserHandler from '../handlers/createUserHandler';
import updateUserHandler from '../handlers/updateUserHandler';
import deleteUserHandler from '../handlers/deleteUserHandler';


const router = express.Router();

router.get('/:id', getUserHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;