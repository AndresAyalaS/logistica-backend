import { Request, Response } from "express";
import { createNewRoute, fetchAllRoutes, fetchRouteById } from "../services/routeService";

export const createRouteController = async (req: Request, res: Response) => {
  try {
    const newRoute = await createNewRoute(req.body);
    res.status(201).json({ message: "Ruta creada correctamente", route: newRoute });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRoutesController = async (_req: Request, res: Response) => {
  try {
    const routes = await fetchAllRoutes();
    res.status(200).json({ routes });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las rutas" });
  }
};

export const getRouteByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const route = await fetchRouteById(Number(id));
    if (!route) res.status(404).json({ message: "Ruta no encontrada" });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la ruta" });
  }
};