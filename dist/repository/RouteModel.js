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
exports.Package = void 0;
const database_1 = __importDefault(require("../config/database"));
class Package {
    createRoute(name, startPoint, endPoint, estimatedDuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO routes (name, start_point, end_point, estimated_duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
            const values = [name, startPoint, endPoint, estimatedDuration];
            const result = yield database_1.default.query(query, values);
            return result.rows[0];
        });
    }
    getRouteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM routes WHERE id = $1;`;
            const result = yield database_1.default.query(query, [id]);
            return result.rows[0];
        });
    }
}
exports.Package = Package;
