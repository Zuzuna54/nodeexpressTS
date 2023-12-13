import { Request, Response } from 'express';
import createUserHandler from '../handlers/createUserHandler';
import { createUser } from '../sqlCalls/userService/userService';

jest.mock('../sqlCalls/userCall');

describe('POST /awesome/applicant', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const name = 'Test User';
    const email = 'test@email.com';
    const phone = '1234567890';
    const mockUser = { name, email, phone };

    it('should create a new user', async () => {
        // Mock the createUser function response


        (createUser as jest.Mock).mockResolvedValue([mockUser]);

        const req = {
            body: { name, email, phone },
        } as Request;
        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn(),
        };

        (res.status as jest.Mock).mockReturnThis();
        (res.json as jest.Mock).mockReturnThis();

        await createUserHandler(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            result: 'success',
            user: mockUser,
            message: 'User created successfully',
        });
    });

    it('Should Handle Internal Server Error', async () => {
        // Mock the createUser function response
        (createUser as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));


        const req = {
            body: { name: jest.fn(), email: jest.fn(), phone: jest.fn() },
        } as Request;
        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn(),
        };

        req.body.name.mockReturnValueOnce('');
        req.body.email.mockReturnValueOnce('');
        req.body.phone.mockReturnValueOnce('');

        (res.status as jest.Mock).mockReturnThis();
        (res.json as jest.Mock).mockReturnThis();

        await createUserHandler(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should handle internal server error', async () => {
        // Mock the createUser function response
        (createUser as jest.Mock).mockRejectedValue(new Error('Invalid input'));


        const req = {
            body: { name, email },
        } as Request;
        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn(),
        };

        (res.status as jest.Mock).mockReturnThis();
        (res.json as jest.Mock).mockReturnThis();

        await createUserHandler(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    });
});
