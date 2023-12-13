"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const deleteUserHandler_1 = __importDefault(require("../handlers/deleteUserHandler"));
const userCall_1 = require("../sqlCalls/userCall");
jest.mock('../sqlCalls/userCall');
describe('DELETE /awesome/applicant/:id', () => {
    it('should delete a user', async () => {
        const mockDeletedUser = { message: "User with the id: 1 deleted", result: "success", };
        userCall_1.deleteUser.mockResolvedValue([mockDeletedUser]);
        userCall_1.getUser.mockResolvedValue([]);
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
        await (0, deleteUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ result: "success", message: `User with the id: ${id} deleted` });
    });
    it('should handle user not found', async () => {
        userCall_1.deleteUser.mockReturnValue({ error: 'User not deleted' });
        userCall_1.getUser.mockResolvedValue([]);
        let id = "1";
        const req = {
            body: {},
            params: { id },
        };
        const res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        res.status.mockReturnValue(204);
        res.json.mockReturnThis();
        await (0, deleteUserHandler_1.default)(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not deleted' });
    });
    it('should handle internal server error', async () => {
        userCall_1.deleteUser.mockRejectedValue({ error: 'Internal Server Error' });
        const response = await (0, supertest_1.default)(app_1.default).delete('/awesome/applicant/1');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
//# sourceMappingURL=deleteUserHandler.test.js.map