import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createShipmentController } from "../controllers/shipmentController";

const router = Router();

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
 *             properties:
 *               destination:
 *                 type: string
 *               weight:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Envío creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authenticateToken, createShipmentController);

export default router;
