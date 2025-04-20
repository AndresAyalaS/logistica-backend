import pool from "../config/database";

export const createInitialStatusHistory = async (
  shipmentId: number,
  status: string = "pending",
  notes: string = "Envío creado"
) => {
  await pool.query(
    `INSERT INTO shipment_status_history (shipment_id, status, notes)
     VALUES ($1, $2, $3)`,
    [shipmentId, status, notes]
  );
};

export const logShipmentStatusChange = async (
  shipmentId: number,
  status: string
) => {
  await pool.query(
    `
    INSERT INTO shipment_status_history (shipment_id, status)
    VALUES ($1, $2)
    `,
    [shipmentId, status]
  );
};
