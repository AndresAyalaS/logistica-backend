import { Request, Response } from "express";

import { validateShipment } from "../validations/shipmentValidation";
import {
  assignRouteAndCarrier,
  createShipmentService,
  getAllShipmentsService,
  getPendingShipmentsService,
  getShipmentByIdService,
  getShipmentHistoryService,
  getShipmentsByUserService,
} from "../services/shipmentService";
import {
  getCarrierById,
  updateCarrierAvailability,
} from "../repository/carrierModel";
import { insertShipmentStatusHistory } from "../repository/ShipmentRepository";
import { getRouteById } from "../repository/RouteModel";

export const createShipmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = validateShipment(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const userId = req.user?.id; // Desde el authMiddleware
  try {
    const shipment = await createShipmentService({
      ...req.body,
      user_id: userId,
    });
    res.status(201).json({ shipment });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentsByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Usuario no autenticado" });
    return;
  }

  try {
    const shipments = await getShipmentsByUserService(userId);
    res.status(200).json({ shipments });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const shipmentId = parseInt(req.params.id);
  try {
    const shipment = await getShipmentByIdService(shipmentId);
    if (!shipment) {
      res.status(404).json({ message: "Envío no encontrado" });
      return;
    }
    res.status(200).json({ shipment });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentHistoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const shipmentId = parseInt(req.params.id);
  try {
    const history = await getShipmentHistoryService(shipmentId);
    res.status(200).json({ history });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingShipmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shipments = await getPendingShipmentsService();
    res.status(200).json({ shipments });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const assignRouteToShipmentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { shipmentId } = req.params;
  const { routeId, carrierId } = req.body;

  try {
    // Validar existencia de la ruta
    const route = await getRouteById(Number(routeId));
    if (!route) {
      res.status(404).json({ message: "Ruta no encontrada" });
    }

    // Validar existencia y disponibilidad del transportista
    const carrier = await getCarrierById(Number(carrierId));
    if (!carrier) {
      res.status(404).json({ message: "Transportista no encontrado" });
    }

    if (!carrier.available) {
      res.status(400).json({ message: "El transportista no está disponible" });
    }

    // Asignar ruta y transportista al envío
    const updatedShipment = await assignRouteAndCarrier(
      Number(shipmentId),
      Number(routeId),
      Number(carrierId)
    );

    // Cambiar disponibilidad del transportista
    await updateCarrierAvailability(Number(carrierId), false);

    // Insertar en el historial de estados
    await insertShipmentStatusHistory({
      shipment_id: Number(shipmentId),
      status: "in_transit",
      notes: "Se asignó ruta y transportista",
    });

    res.status(200).json({
      message: "Ruta y transportista asignados correctamente",
      shipment: updatedShipment,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};


export const getAllShipmentsController = async (req: Request,res: Response) => {
  try {
    const shipments = await getAllShipmentsService();
    if (!shipments || shipments.length === 0) {
      res.status(404).json({ message: "No se encontraron envíos." });
      return;
    }
    res.status(200).json({ shipments });
  } catch (error) {
    console.error("Error al obtener los envíos:", error);
    res.status(500).json({ message: "Error al obtener los envíos" });
  }
};
