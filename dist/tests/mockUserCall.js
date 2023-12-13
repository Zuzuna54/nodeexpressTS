"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.createUser = void 0;
const createUser = async (name) => {
    const newUser = { id: 1, name };
    return newUser;
};
exports.createUser = createUser;
const deleteUser = async (id) => {
    const deletedUser = { message: "User with the id: 1 deleted",
        result: "success", };
    if (id === '25') {
        throw new Error('User not found');
    }
    return deletedUser;
};
exports.deleteUser = deleteUser;
const getUser = async (id) => {
    if (id === '1') {
        return { id: '1', name: 'Test User' };
    }
    else if (id === '25') {
        throw new Error('User not found');
    }
    else {
        throw new Error('User not found');
    }
};
exports.getUser = getUser;
//# sourceMappingURL=mockUserCall.js.map