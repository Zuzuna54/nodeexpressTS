"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = void 0;
const db_1 = require("../db");
const getUser = async (id) => {
    const { rows } = await db_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows;
};
exports.getUser = getUser;
const createUser = async (name, email, phone) => {
    const { rows } = await db_1.pool.query('INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);
    return rows;
};
exports.createUser = createUser;
const deleteUser = async (id) => {
    const { rows } = await db_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
    return rows;
};
exports.deleteUser = deleteUser;
const updateUser = async (id, name, email, phone) => {
    const { rows } = await db_1.pool.query('UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [name, email, phone, id]);
    return rows;
};
exports.updateUser = updateUser;
//# sourceMappingURL=userCall.js.map