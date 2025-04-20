import pool from "../config/database";

export class Package {

  async createRoute(name: string, startPoint: string, endPoint: string, estimatedDuration: number) {
    const query = `
    INSERT INTO routes (name, start_point, end_point, estimated_duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [name, startPoint, endPoint, estimatedDuration];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getRouteById(id: number) {
    const query = `SELECT * FROM routes WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}