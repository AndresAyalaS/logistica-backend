import pool from "../config/database";

export const createShipment = async (shipment: any) => {
  const {
    user_id,
    weight,
    dimensions,
    product_type,
    origin_address,
    destination_address,
    tracking_number,
    status
  } = shipment;

  const result = await pool.query(
    `INSERT INTO shipments 
    (user_id, weight, dimensions, product_type, origin_address, destination_address, tracking_number, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [user_id, weight, dimensions, product_type, origin_address, destination_address, tracking_number, status]
  );

  return result.rows[0];
};
