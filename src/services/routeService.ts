import { RouteData } from "types/iroute";
import { createRoute, getAllRoutes, getRouteById } from "../repository/RouteModel";

export const createNewRoute = async (routeData: RouteData) => {
  return await createRoute(routeData);
};

export const fetchAllRoutes = async () => {
  return await getAllRoutes();
};

export const fetchRouteById = async (id: number) => {
  return await getRouteById(id);
};