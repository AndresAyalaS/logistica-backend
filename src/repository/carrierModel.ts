import pool from "../config/database";

export class Carrier {

  async createCarrier(name: string, vehicleType: string, capacity: number, available = true) {
    const query = `
    INSERT INTO carriers (name, vehicle_type, capacity, available)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [name, vehicleType, capacity, available];
    const result = await pool.query(query, values);
    return result.rows[0];
  };

  async getCarrierById(id: number) {
    const query = `SELECT * FROM carriers WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };
}