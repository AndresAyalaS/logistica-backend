"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShipmentService = void 0;
const ShipmentRepository_1 = require("../repository/ShipmentRepository");
const tracking_1 = require("../utils/tracking");
const createShipmentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingNumber = (0, tracking_1.generateTrackingNumber)();
    const shipmentData = Object.assign(Object.assign({}, data), { tracking_number: trackingNumber, status: "pending" });
    const newShipment = yield (0, ShipmentRepository_1.createShipment)(shipmentData);
    return newShipment;
});
exports.createShipmentService = createShipmentService;
