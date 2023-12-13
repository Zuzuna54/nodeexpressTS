"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCall_1 = require("../sqlCalls/userCall");
const updateUserHandler = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const user = await (0, userCall_1.updateUser)(id, name, email, phone);
        if (!user.length) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(200).json({ result: "success", userAfterUpdate: user[0], message: "User updated successfully!" });
        }
    }
    catch (error) {
        console.log(res + " " + error);
        console.log(typeof res);
        console.error('Error updating applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = updateUserHandler;
//# sourceMappingURL=updateUserHandler.js.map