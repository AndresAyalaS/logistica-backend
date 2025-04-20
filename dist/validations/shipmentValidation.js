"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateShipment = void 0;
const joi_1 = __importDefault(require("joi"));
const validateShipment = (data) => {
    const schema = joi_1.default.object({
        weight: joi_1.default.number().positive().required(),
        dimensions: joi_1.default.object({
            length: joi_1.default.number().positive().required(),
            width: joi_1.default.number().positive().required(),
            height: joi_1.default.number().positive().required(),
        }).required(),
        product_type: joi_1.default.string().max(100).required(),
        origin_address: joi_1.default.string().required(),
        destination_address: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.validateShipment = validateShipment;
