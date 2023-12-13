"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCall_1 = require("../sqlCalls/userCall");
const getUserHandler = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: 'Bad Request' });
    try {
        const user = await (0, userCall_1.getUser)(id);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(200).json({ result: "success", data: user[0], message: "User retrived successfully" });
        }
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = getUserHandler;
//# sourceMappingURL=getUserHandler.js.map