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
exports.ShipmentStatusHistory = void 0;
class ShipmentStatusHistory {
    constructor(db) {
        this.db = db;
    }
    addShipmentStatusHistory(shipmentId, status, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO shipment_status_history (shipment_id, status, notes)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
            const values = [shipmentId, status, notes];
            const result = yield this.db.query(query, values);
            return result.rows[0];
        });
    }
    getShipmentStatusHistory(shipmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM shipment_status_history WHERE shipment_id = $1 ORDER BY created_at DESC;`;
            const result = yield this.db.query(query, [shipmentId]);
            return result.rows;
        });
    }
}
exports.ShipmentStatusHistory = ShipmentStatusHistory;
