"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUserHandler_1 = __importDefault(require("../handlers/createUserHandler"));
const userCall_1 = require("../sqlCalls/userCall");
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
        userCall_1.createUser.mockResolvedValue([mockUser]);
        const req = {
            body: { name, email, phone },
        };
        const res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        res.status.mockReturnThis();
        res.json.mockReturnThis();
        await (0, createUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            result: 'success',
            user: mockUser,
            message: 'User created successfully',
        });
    });
    it('Should Handle Internal Server Error', async () => {
        userCall_1.createUser.mockRejectedValue(new Error('Internal Server Error'));
        const req = {
            body: { name: jest.fn(), email: jest.fn(), phone: jest.fn() },
        };
        const res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        req.body.name.mockReturnValueOnce('');
        req.body.email.mockReturnValueOnce('');
        req.body.phone.mockReturnValueOnce('');
        res.status.mockReturnThis();
        res.json.mockReturnThis();
        await (0, createUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
    it('should handle internal server error', async () => {
        userCall_1.createUser.mockRejectedValue(new Error('Invalid input'));
        const req = {
            body: { name, email },
        };
        const res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        res.status.mockReturnThis();
        res.json.mockReturnThis();
        await (0, createUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    });
});
//# sourceMappingURL=createUserHandler.test.js.map