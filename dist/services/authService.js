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
exports.AuthService = void 0;
const userRepository_1 = require("../repository/userRepository");
const jwtUtils_1 = require("../utils/jwtUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRET = 'tu_secreto_jwt';
class AuthService {
    static register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario ya existe
            const existingUser = yield userRepository_1.UserRepository.findUserByEmail(email);
            if (existingUser) {
                throw new Error('El correo ya está registrado.');
            }
            // Hashear la contraseña
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Crear el usuario
            const user = yield userRepository_1.UserRepository.createUser(username, email, hashedPassword);
            const token = (0, jwtUtils_1.generateToken)(user.id, user.email, user.role);
            return { user, token };
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar al usuario por correoº
            const user = yield userRepository_1.UserRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('El correo no está registrado.');
            }
            // Verificar la contraseña
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta.');
            }
            const token = (0, jwtUtils_1.generateToken)(user.id, user.email, user.role);
            return { user, token };
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.UserRepository.findUserByEmail(email);
        });
    }
}
exports.AuthService = AuthService;
