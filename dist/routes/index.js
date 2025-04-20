"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = require("express");
const authRoutes_1 = require("./authRoutes");
const router = (0, express_1.Router)();
const setRoutes = (app) => {
    (0, authRoutes_1.setAuthRoutes)(router);
    app.use('/api', router);
};
exports.setRoutes = setRoutes;
