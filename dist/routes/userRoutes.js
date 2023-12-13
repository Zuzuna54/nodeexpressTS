"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserHandler_1 = __importDefault(require("../handlers/getUserHandler"));
const createUserHandler_1 = __importDefault(require("../handlers/createUserHandler"));
const updateUserHandler_1 = __importDefault(require("../handlers/updateUserHandler"));
const deleteUserHandler_1 = __importDefault(require("../handlers/deleteUserHandler"));
const router = express_1.default.Router();
router.get('/:id', getUserHandler_1.default);
router.post('/', createUserHandler_1.default);
router.put('/:id', updateUserHandler_1.default);
router.delete('/:id', deleteUserHandler_1.default);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map