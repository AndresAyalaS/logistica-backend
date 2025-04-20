export class Shipment {

  private db: any;

  constructor(db: any) {
    this.db = db;
  }


  async createShipment(
    userId: number,
    packageId: number,
    originAddress: string,
    destinationAddress: string,
    trackingNumber: string,
    status = 'pending',
    routeId?: number,
    carrierId?: number
  ) {
    const query = `
    INSERT INTO shipments (user_id, package_id, origin_address, destination_address, tracking_number, status, route_id, carrier_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
    const values = [userId, packageId, originAddress, destinationAddress, trackingNumber, status, routeId, carrierId];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async getShipmentById(id: number) {
    const query = `SELECT * FROM shipments WHERE id = $1;`;
    const result = await this.db.query(query, [id]);
    return result.rows[0];
  }
}