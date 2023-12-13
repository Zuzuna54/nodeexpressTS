import request from 'supertest';
import app from '../app';
import deleteUserHandler from '../handlers/deleteUserHandler';
import { Request, Response } from 'express';
import userService from '../sqlCalls/userService/userService';


jest.mock('../sqlCalls/userCall'); // Update the path as needed

describe('DELETE /awesome/applicant/:id', () => {
    it('should delete a user', async () => {
        // Mock the deleteUser function response
        const mockDeletedUser = { message: "User with the id: 1 deleted", result: "success", };
        (userService.deleteUser as jest.Mock).mockResolvedValue([mockDeletedUser]);
        (userService.getUser as jest.Mock).mockResolvedValue([])

        let id = "1"

        const req = {
            body: {},
            params: { id },
        } as Request<any, any, any, any>; // Define the correct type for Request

        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn(),
        };

        (res.status as jest.Mock).mockReturnThis();
        (res.json as jest.Mock).mockReturnThis();

        await deleteUserHandler(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ result: "success", message: `User with the id: ${id} deleted` });
    });


    it('should handle user not found', async () => {
        // Mock the deleteUser function response
        (userService.deleteUser as jest.Mock).mockReturnValue({ error: 'User not deleted' });
        (userService.getUser as jest.Mock).mockResolvedValue([]);

        let id = "1"

        const req = {
            body: {},
            params: { id },
        } as Request<any, any, any, any>; // Define the correct type for Request

        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn(),
        };

        (res.status as jest.Mock).mockReturnValue(204);
        (res.json as jest.Mock).mockReturnThis();

        await deleteUserHandler(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not deleted' });
    });

    it('should handle internal server error', async () => {
        // Mock the deleteUser function response
        (userService.deleteUser as jest.Mock).mockRejectedValue({ error: 'Internal Server Error' });

        const response = await request(app).delete('/awesome/applicant/1');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});