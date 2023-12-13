import { pool } from '../db';

// SQL call to get user by id
export const getUser = async (id: string): Promise<any> => {

    try {

        const { rows } = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        return rows;

    } catch (error) {

        console.error('Error getting user:', error);
        return error;

    }

};

// SQL call to create user with name, email, phone, and password
export const createUser = async (name: string, email: string, phone: string, password: string): Promise<any> => {

    try {

        const { rows } = await pool.query(
            'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone, password]
        );
        return rows;

    } catch (error) {

        console.error('Error creating user:', error);
        return error;

    }
}

// SQL call to delete user by id
export const deleteUser = async (id: string): Promise<any> => {

    try {

        const { rows } = await pool.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
        return rows;

    } catch (error) {

        console.error('Error deleting user:', error);
        return error;

    }
}

// SQL call to update user by id
export const updateUser = async (id: string, name: string, email: string, phone: string, password: string): Promise<any> => {

    try {

        const { rows } = await pool.query(
            'UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5 RETURNING *',
            [name, email, phone, password, id]
        );
        return rows;

    } catch (error) {

        console.error('Error updating user:', error);
        return error;

    }
}