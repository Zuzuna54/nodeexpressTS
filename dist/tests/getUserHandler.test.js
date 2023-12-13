"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const getUserHandler_1 = __importDefault(require("../handlers/getUserHandler"));
const mockUserCall_1 = require("./mockUserCall");
jest.mock('./mockUserCall');
describe('GET /awesome/applicant/:id', () => {
    it('should return user details', async () => {
        const userId = '1';
        const mockUser = {
            id: userId,
            name: 'Test User',
        };
        mockUserCall_1.getUser.mockResolvedValue([mockUser, mockUser]);
        let id = "1";
        const req = {
            body: {},
            params: { id },
        };
        const res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        res.status.mockReturnThis();
        res.json.mockReturnThis();
        await (0, getUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ result: "success", data: mockUser, message: "User retrived successfully" });
    });
    it('should handle user not found', async () => {
        const userId = '25';
        mockUserCall_1.getUser.mockResolvedValue({ message: 'User not found' });
        const response = await (0, supertest_1.default)(app_1.default).get(`/awesome/applicant/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'User not found' });
    });
    it('should handle internal server error', async () => {
        const userId = '';
        mockUserCall_1.getUser.mockResolvedValue([]);
        const response = await (0, supertest_1.default)(app_1.default).get(`/awesome/applicant/${userId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
//# sourceMappingURL=getUserHandler.test.js.map