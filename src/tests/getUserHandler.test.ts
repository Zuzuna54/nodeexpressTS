import request from 'supertest';
import app from '../app'; // Update the path as needed
import getUserHandler from '../handlers/getUserHandler'; // Update the path as needed
import { Request, Response } from 'express';
import { getUser } from './mockUserCall'; // Update the path as needed

jest.mock('./mockUserCall'); // Update the path as needed

describe('GET /awesome/applicant/:id', () => {
  it('should return user details', async () => {
    const userId = '1';
    const mockUser = {
      id: userId,
      name: 'Test User',
      // ...other properties
    };

    (getUser as jest.Mock).mockResolvedValue([mockUser, mockUser]);

    let id = "1"

    const req = {
      body: { },
      params: { id },
    } as Request<any, any, any, any>; // Define the correct type for Request

    const res: Partial<Response> = {
      status: jest.fn(),
      json: jest.fn(),
    };

    (res.status as jest.Mock).mockReturnThis();
    (res.json as jest.Mock).mockReturnThis();

    await getUserHandler(req, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({result: "success", data: mockUser, message: "User retrived successfully"});
  });

  it('should handle user not found', async () => {
    const userId = '25';

    // Mock the getUser function to return null (user not found)
    (getUser as jest.Mock).mockResolvedValue({ message: 'User not found' });

    const response = await request(app).get(`/awesome/applicant/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should handle internal server error', async () => {
    const userId = '';

    // Mock the getUser function to throw an error
    (getUser as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get(`/awesome/applicant/${userId}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });

  // Add more test cases as needed
});
