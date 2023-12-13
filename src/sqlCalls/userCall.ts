import { pool } from '../db';


export const getUser = async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows;
};


export const createUser = async (name: string, email: string, phone: string) => {
    const { rows } = await pool.query('INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [name, email, phone]);
    return rows;
}


export const deleteUser = async (id: string) => {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return rows;
}


export const updateUser = async (id: string, name: string, email: string, phone: string) => {
    const { rows } = await pool.query('UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [name, email, phone, id]);
    return rows;
}