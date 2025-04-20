import { Request, Response } from "express";

import { validateShipment } from "../validations/shipmentValidation";
import { createShipmentService } from "../services/shipmentService";


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
