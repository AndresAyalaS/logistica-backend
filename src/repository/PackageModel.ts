import pool from "../config/database";

export class Package {

  async createPackage(weight: number, dimensions: object, productType: string) {
    const query = `
    INSERT INTO packages (weight, dimensions, product_type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [weight, dimensions, productType];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getPackageById(id: number) {
    const query = `SELECT * FROM packages WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}