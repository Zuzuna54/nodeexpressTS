import { pool } from '../db';


// User Service Class
class UserService {

    // SQL call to get user by id
    async getUser(id: string): Promise<any> {

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

    //Get User by name
    async getUserByUsername(name: string): Promise<any> {

        try {

            const { rows } = await pool.query(
                'SELECT * FROM users WHERE name = $1',
                [name]
            );
            return rows;

        } catch (error) {

            console.error('Error getting user:', error);
            return error;

        }

    };

    // SQL call to create user with name, email, phone, and password
    async createUser(name: string, email: string, phone: string, password: string, id: string): Promise<any> {

        try {

            const { rows } = await pool.query(
                'INSERT INTO users (name, email, phone, password, uuid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, phone, password, id]
            );
            return rows;

        } catch (error) {

            console.error('Error creating user:', error);
            return error;

        }
    }

    // SQL call to delete user by id
    async deleteUser(id: string): Promise<any> {

        try {

            const { rows } = await pool.query(
                'DELETE FROM users WHERE uuid = $1',
                [id]
            );
            return rows;

        } catch (error) {

            console.error('Error deleting user:', error);
            return error;

        }
    }

    // SQL call to update user by id
    async updateUser(id: string, name: string, email: string, phone: string, password: string): Promise<any> {

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

}

export default new UserService();