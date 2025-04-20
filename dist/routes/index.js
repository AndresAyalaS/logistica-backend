"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = require("express");
const authRoutes_1 = require("./authRoutes");
const shipmentRoutes_1 = __importDefault(require("./shipmentRoutes"));
const setRoutes = (app) => {
    const router = (0, express_1.Router)();
    // Rutas públicas (auth)
    (0, authRoutes_1.setAuthRoutes)(router);
    app.use('/api', router);
    // Rutas protegidas (requieren token JWT)
    router.use('/shipments', shipmentRoutes_1.default);
};
exports.setRoutes = setRoutes;
