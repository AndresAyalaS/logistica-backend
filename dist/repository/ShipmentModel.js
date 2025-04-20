"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipment = void 0;
class Shipment {
    constructor(db) {
        this.db = db;
    }
    createShipment(userId, packageId, originAddress, destinationAddress, trackingNumber, status = 'pending', routeId, carrierId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO shipments (user_id, package_id, origin_address, destination_address, tracking_number, status, route_id, carrier_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
            const values = [userId, packageId, originAddress, destinationAddress, trackingNumber, status, routeId, carrierId];
            const result = yield this.db.query(query, values);
            return result.rows[0];
        });
    }
    getShipmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM shipments WHERE id = $1;`;
            const result = yield this.db.query(query, [id]);
            return result.rows[0];
        });
    }
}
exports.Shipment = Shipment;
