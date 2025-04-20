import { Request, Response } from "express";

import { validateShipment } from "../validations/shipmentValidation";
import { assignRouteAndCarrier, createShipmentService, getPendingShipmentsService, getShipmentByIdService, getShipmentHistoryService, getShipmentsByUserService } from "../services/shipmentService";


export const createShipmentController = async (req: Request, res: Response): Promise<void> => {
  const { error } = validateShipment(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const userId = req.user?.id; // Desde el authMiddleware
  try {
    const shipment = await createShipmentService({ ...req.body, user_id: userId });
    res.status(201).json({ shipment });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentsByUserController = async (req: Request, res: Response): Promise<void> => {
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

export const getShipmentByIdController = async (req: Request, res: Response): Promise<void> => {
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

export const getShipmentHistoryController = async (req: Request, res: Response): Promise<void> => {
  const shipmentId = parseInt(req.params.id);
  try {
    const history = await getShipmentHistoryService(shipmentId);
    res.status(200).json({ history });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingShipmentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const shipments = await getPendingShipmentsService();
    res.status(200).json({ shipments });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const assignRouteToShipmentController = async (req: Request, res: Response) => {
  const { shipmentId } = req.params;
  const { routeId, carrierId } = req.body;

  try {
    const updatedShipment = await assignRouteAndCarrier(
      Number(shipmentId),
      Number(routeId),
      Number(carrierId)
    );

    res.status(200).json({
      message: "Ruta y transportista asignados correctamente",
      shipment: updatedShipment,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
