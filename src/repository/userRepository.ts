import pool from "../config/database";
import { User } from "../types";

export class UserRepository {

    static async createUser(username: string, email: string, password: string, role = 'client'): Promise<User> {
        const query = `
          INSERT INTO users (username, email, password, role)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [username, email, password, role];
        const result = await pool.query(query, values);
        return result.rows[0];
    };

    static async findUserByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
}

