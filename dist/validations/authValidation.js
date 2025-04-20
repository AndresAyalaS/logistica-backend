"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// Validación para el registro de usuarios
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: zod_1.z.string().email('El correo electrónico no es válido'),
    password: zod_1.z.string().min(5, 'La contraseña debe tener al menos 5 caracteres'),
});
// Validación para el login de usuarios
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('El correo electrónico no es válido'),
    password: zod_1.z.string().min(5, 'La contraseña es requerida'),
});
