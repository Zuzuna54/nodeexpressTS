"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCall_1 = require("../sqlCalls/userCall");
const deleteUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const del = await (0, userCall_1.deleteUser)(id);
        res.status(200).json({ result: "success", message: `User with the id: ${id} deleted` });
        const userSearch = await (0, userCall_1.getUser)(id);
        if (userSearch.length === 0) {
            console.log('User deleted');
            res.status(200).json({ result: "success", message: `User with the id: ${id} deleted` });
        }
        else {
            console.log('User not deleted');
            res.status(204).json({ error: 'User not deleted' });
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = deleteUserHandler;
//# sourceMappingURL=deleteUserHandler.js.map