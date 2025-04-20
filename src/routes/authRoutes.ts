import { Router } from 'express';
import AuthController from '../controllers/authController';

export const setAuthRoutes = (app: Router) => {

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
        AuthController.register(req, res).catch(next);
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
        AuthController.login(req, res).catch(next);
    });
};
