export class ShipmentStatusHistory {

  private db: any;

  constructor(db: any) {
    this.db = db;
  }


  async addShipmentStatusHistory(shipmentId: number, status: string, notes?: string) {
    const query = `
    INSERT INTO shipment_status_history (shipment_id, status, notes)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [shipmentId, status, notes];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async getShipmentStatusHistory(shipmentId: number) {
    const query = `SELECT * FROM shipment_status_history WHERE shipment_id = $1 ORDER BY created_at DESC;`;
    const result = await this.db.query(query, [shipmentId]);
    return result.rows;
  }
}