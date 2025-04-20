"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthRoutes = void 0;
const authController_1 = __importDefault(require("../controllers/authController"));
const setAuthRoutes = (app) => {
    app.post('/api/auth/register', (req, res, next) => {
        authController_1.default.register(req, res).catch(next);
    });
    app.post('/api/auth/login', (req, res, next) => {
        authController_1.default.login(req, res).catch(next);
    });
};
exports.setAuthRoutes = setAuthRoutes;
