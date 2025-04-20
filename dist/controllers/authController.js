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
const authService_1 = require("../services/authService");
const authValidation_1 = require("../validations/authValidation");
class AuthController {
    // Registro de usuario
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = authValidation_1.registerSchema.parse(req.body);
                const { username, email, password } = req.body;
                const newUser = yield authService_1.AuthService.register(username, email, password);
                return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Inicio de sesión
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = authValidation_1.loginSchema.parse(req.body);
                const { email, password } = req.body;
                const token = yield authService_1.AuthService.login(email, password);
                return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = AuthController;
