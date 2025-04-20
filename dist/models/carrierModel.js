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
exports.Carrier = void 0;
class Carrier {
    constructor(db) {
        this.db = db;
    }
    createCarrier(name, vehicleType, capacity, available = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO carriers (name, vehicle_type, capacity, available)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
            const values = [name, vehicleType, capacity, available];
            const result = yield this.db.query(query, values);
            return result.rows[0];
        });
    }
    ;
    getCarrierById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM carriers WHERE id = $1;`;
            const result = yield this.db.query(query, [id]);
            return result.rows[0];
        });
    }
    ;
}
exports.Carrier = Carrier;
