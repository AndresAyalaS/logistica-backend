"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(403).json({ message: "No token provided!" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized!" });
    }
};
exports.authenticateToken = authenticateToken;
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.user = { id: decoded.id };
        next();
    });
};
exports.default = exports.authenticateToken;
