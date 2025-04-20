import { Router } from "express";
import { createCarrierController, getAllCarriersController, getCarrierByIdController } from "../controllers/carrierController";
import authMiddleware, { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transportistas
 *   description: Endpoints para gestionar transportistas
 */

/**
 * @swagger
 * /api/carriers:
 *   post:
 *     summary: Crear un nuevo transportista
 *     tags: [Transportistas]
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
 *               - vehicle_type
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               vehicle_type:
 *                 type: string
 *                 example: Camión
 *               capacity:
 *                 type: number
 *                 format: float
 *                 example: 1500.5
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Transportista creado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", authenticateToken, createCarrierController);

/**
 * @swagger
 * /api/carriers:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Transportistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transportistas
 */
router.get("/", authMiddleware, getAllCarriersController);

/**
 * @swagger
 * /api/carriers/{id}:
 *   get:
 *     summary: Obtener transportista por ID
 *     tags: [Transportistas]
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
 *         description: Transportista encontrado
 *       404:
 *         description: Transportista no encontrado
 */
router.get("/:id", authMiddleware, getCarrierByIdController);

export default router;