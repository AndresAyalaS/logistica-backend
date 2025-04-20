import { Router } from "express";
import authMiddleware, {
  authenticateToken,
} from "../middlewares/authMiddleware";
import {
  createShipmentController,
  getPendingShipmentsController,
  getShipmentByIdController,
  getShipmentHistoryController,
  getShipmentsByUserController,
} from "../controllers/shipmentController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Envíos
 *   description: Endpoints para gestionar envíos
 */


/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Crear un nuevo envío
 *     tags:
 *       - Envíos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *               - dimensions
 *               - product_type
 *               - origin_address
 *               - destination_address
 *             properties:
 *               weight:
 *                 type: number
 *                 format: float
 *                 example: 5.25
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   length:
 *                     type: number
 *                     example: 30
 *                   width:
 *                     type: number
 *                     example: 20
 *                   height:
 *                     type: number
 *                     example: 15
 *               product_type:
 *                 type: string
 *                 example: "Electrónicos"
 *               origin_address:
 *                 type: string
 *                 example: "Calle 123, Bogotá"
 *               destination_address:
 *                 type: string
 *                 example: "Carrera 45, Medellín"
 *               route_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *               carrier_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       200:
 *         description: Envío creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", authenticateToken, createShipmentController);

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Obtener todos los envíos del usuario autenticado
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de envíos
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, getShipmentsByUserController);

/**
 * @swagger
 * /api/shipments/pending:
 *   get:
 *     summary: Obtener todos los envíos pendientes
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de envíos pendientes
 *       401:
 *         description: No autorizado
 */
router.get("/pending", authMiddleware, getPendingShipmentsController);

/**
 * @swagger
 * /api/shipments/{id}:
 *   get:
 *     summary: Obtener detalles de un envío por ID
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del envío
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del envío
 *       404:
 *         description: Envío no encontrado
 */
router.get("/:id", authMiddleware, getShipmentByIdController);

/**
 * @swagger
 * /api/shipments/{id}/history:
 *   get:
 *     summary: Obtener historial de estados de un envío
 *     tags: [Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del envío
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial del envío
 *       404:
 *         description: Historial no encontrado
 */
router.get("/:id/history", authMiddleware, getShipmentHistoryController);

export default router;
