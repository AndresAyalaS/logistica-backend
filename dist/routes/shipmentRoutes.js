"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const shipmentController_1 = require("../controllers/shipmentController");
const router = (0, express_1.Router)();
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
router.post('/', authMiddleware_1.authenticateToken, shipmentController_1.createShipmentController);
exports.default = router;
