"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userCall_1 = require("../sqlCalls/userCall");
const createUserHandler = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    try {
        const user = await (0, userCall_1.createUser)(name, email, phone);
        res.status(200).json({ result: "success", user: user[0], message: "User created successfully" });
    }
    catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = createUserHandler;
//# sourceMappingURL=createUserHandler.js.map