// import { Request, Response } from 'express';
// import updateUserHandler from '../handlers/updateUserHandler';
// import { updateUser } from './mockUserCall';

// jest.mock('../sqlCalls/userCall'); // Mock the updateUser function
// let req: Partial<Request> = {
//     params: { id: '14' },
//     body: { name: 'New Name', email: 'new@example.com', phone: '555-555-5555' },
// };

// let res: Partial<Response> = {
//     status: jest.fn() as any, // Cast to any
//     json: jest.fn(),
// };

// describe('updateUserHandler', () => {
   

//     it('should update user and return success', async () => {
//         const mockUpdatedUser = [{name: 'New Name', email: 'new@example.com', phone: '555-555-5555' }];
//         (updateUser as jest.Mock).mockResolvedValueOnce(mockUpdatedUser);

//         await updateUserHandler(req as Request, res as Response);

//         expect(updateUser).toHaveBeenCalledWith('New Name', 'new@example.com', '555-555-5555');
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             result: 'success',
//             userAfterUpdate: mockUpdatedUser[0],
//             message: 'User updated successfully!',
//         });
//     });

//     it('should handle user not found', async () => {
//         (updateUser as jest.Mock).mockResolvedValueOnce([]); // Mock user not found

//         await updateUserHandler(req as Request, res as Response);

//         expect(updateUser).toHaveBeenCalledWith('123', 'New Name', 'new@example.com', '555-555-5555');
//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({ error: 'User not found' }); // Correct error message
//     });

//     it('should handle internal server error', async () => {
//         (updateUser as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

//         await updateUserHandler(req as Request, res as Response);

//         expect(updateUser).toHaveBeenCalledWith('123', 'New Name', 'new@example.com', '555-555-5555');
//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//     });
// });
