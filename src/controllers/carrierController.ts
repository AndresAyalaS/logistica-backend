import { Request, Response } from "express";
import { createNewCarrier, fetchAllCarriers, fetchCarrierById } from "../services/carrierService";

export const createCarrierController = async (req: Request, res: Response) => {
  try {
    const newCarrier = await createNewCarrier(req.body);
    res.status(201).json({ message: "Transportista creado correctamente", carrier: newCarrier });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCarriersController = async (_req: Request, res: Response) => {
  try {
    const carriers = await fetchAllCarriers();
    res.status(200).json({carriers});
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los transportistas" });
  }
};

export const getCarrierByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const carrier = await fetchCarrierById(Number(id));
    if (!carrier) res.status(404).json({ message: "Transportista no encontrado" });
    res.status(200).json(carrier);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el transportista" });
  }
};