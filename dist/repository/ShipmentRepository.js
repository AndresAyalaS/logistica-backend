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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShipment = void 0;
const database_1 = __importDefault(require("../config/database"));
const createShipment = (shipment) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, weight, dimensions, product_type, origin_address, destination_address, tracking_number, status } = shipment;
    const result = yield database_1.default.query(`INSERT INTO shipments 
    (user_id, weight, dimensions, product_type, origin_address, destination_address, tracking_number, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`, [user_id, weight, dimensions, product_type, origin_address, destination_address, tracking_number, status]);
    return result.rows[0];
});
exports.createShipment = createShipment;
