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
exports.Package = void 0;
class Package {
    constructor(db) {
        this.db = db;
    }
    createPackage(weight, dimensions, productType) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    INSERT INTO packages (weight, dimensions, product_type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
            const values = [weight, dimensions, productType];
            const result = yield this.db.query(query, values);
            return result.rows[0];
        });
    }
    getPackageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM packages WHERE id = $1;`;
            const result = yield this.db.query(query, [id]);
            return result.rows[0];
        });
    }
}
exports.Package = Package;
