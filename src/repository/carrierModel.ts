import { CarrierInput } from "types/carrier";
import pool from "../config/database";

export const createCarrier = async (carrierData: CarrierInput) => {
  const { name, vehicle_type, capacity } = carrierData;
  const result = await pool.query(
    `INSERT INTO carriers (name, vehicle_type, capacity)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, vehicle_type, capacity]
  );
  return result.rows[0];
};

export const getAllCarriers = async () => {
  const result = await pool.query("SELECT * FROM carriers");
  return result.rows;
};

export const getCarrierById = async (id: number) => {
  const result = await pool.query("SELECT * FROM carriers WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateCarrierAvailability = async (
  carrierId: number,
  available: boolean
) => {
  await pool.query("UPDATE carriers SET available = $1 WHERE id = $2", [available, carrierId]);
};