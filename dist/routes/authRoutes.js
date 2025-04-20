"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthRoutes = void 0;
const authController_1 = __importDefault(require("../controllers/authController"));
const setAuthRoutes = (app) => {
    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     tags:
     *       - Autenticación
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente
     *       400:
     *         description: Error en los datos enviados
     */
    app.post('/auth/register', (req, res, next) => {
        authController_1.default.register(req, res).catch(next);
    });
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesión
     *     tags:
     *       - Autenticación
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *       401:
     *         description: Credenciales inválidas
     */
    app.post('/auth/login', (req, res, next) => {
        authController_1.default.login(req, res).catch(next);
    });
};
exports.setAuthRoutes = setAuthRoutes;
