import { Router } from "express";
import { createRouteController, getAllRoutesController, getRouteByIdController } from "../controllers/routeController";
import authMiddleware, { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Rutas
 *   description: Endpoints para gestionar rutas
 */

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Crear una nueva ruta
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - start_point
 *               - end_point
 *               - estimated_duration
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ruta Norte
 *               start_point:
 *                 type: string
 *                 example: Bogotá
 *               end_point:
 *                 type: string
 *                 example: Medellín
 *               estimated_duration:
 *                 type: integer
 *                 example: 480
 *     responses:
 *       201:
 *         description: Ruta creada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", authenticateToken, createRouteController);

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Obtener todas las rutas
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas
 */
router.get("/", authMiddleware, getAllRoutesController);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Obtener ruta por ID
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta encontrada
 *       404:
 *         description: Ruta no encontrada
 */
router.get("/:id", authMiddleware, getRouteByIdController);

export default router;