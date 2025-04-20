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
exports.UserRepository = void 0;
const database_1 = __importDefault(require("../config/database"));
class UserRepository {
    static createUser(username, email, password, role = 'client') {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
          INSERT INTO users (username, email, password, role)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
            const values = [username, email, password, role];
            const result = yield database_1.default.query(query, values);
            return result.rows[0];
        });
    }
    ;
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = yield database_1.default.query(query, [email]);
            return result.rows[0];
        });
    }
}
exports.UserRepository = UserRepository;
