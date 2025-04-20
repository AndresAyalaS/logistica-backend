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


export const getShipmentsByUserRepository = async (userId: number) => {
  const result = await pool.query(
    "SELECT * FROM shipments WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

export const getShipmentByIdRepository = async (shipmentId: number) => {
  const result = await pool.query("SELECT * FROM shipments WHERE id = $1", [shipmentId]);
  return result.rows[0];
};

export const getShipmentHistoryRepository = async (shipmentId: number) => {
  const result = await pool.query(
    "SELECT * FROM shipment_history WHERE shipment_id = $1 ORDER BY created_at ASC",
    [shipmentId]
  );
  return result.rows;
};

export const getPendingShipmentsRepository = async () => {
  const result = await pool.query("SELECT * FROM shipments WHERE status = 'pending'");
  return result.rows;
};

// Obtener un envío por ID
export const getShipmentById = async (shipmentId: number) => {
  const result = await pool.query("SELECT * FROM shipments WHERE id = $1", [shipmentId]);
  return result.rows[0];
};

// Asignar ruta y transportista, cambiar estado a 'in_transit'
export const assignRouteAndCarrier = async (
  shipmentId: number,
  routeId: number,
  carrierId: number
) => {
  const result = await pool.query(
    `
    UPDATE shipments 
    SET route_id = $1, carrier_id = $2, status = 'in_transit', updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
    `,
    [routeId, carrierId, shipmentId]
  );

  return result.rows[0];
};