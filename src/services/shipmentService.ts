import { createInitialStatusHistory } from "../repository/ShipmentStatusHistoryModel";
import { createShipment, getPendingShipmentsRepository, getShipmentByIdRepository, getShipmentHistoryRepository, getShipmentsByUserRepository, getAllShipments  } from "../repository/ShipmentRepository";
import { generateTrackingNumber } from "../utils/tracking";
import * as ShipmentRepository from "../repository/ShipmentRepository";
import * as CarrierModel from "../repository/carrierModel";
import * as RouteModel from "../repository/RouteModel";
import * as ShipmentStatusHistory from "../repository/ShipmentStatusHistoryModel";


export const createShipmentService = async (data: any) => {
  const trackingNumber = generateTrackingNumber();
  const shipmentData = {
    ...data,
    tracking_number: trackingNumber,
    status: "pending"
  };
  const newShipment = await createShipment(shipmentData);
  await createInitialStatusHistory(newShipment.id);
  return newShipment;
};

export const getShipmentsByUserService = async (userId: number) => {
  return await getShipmentsByUserRepository(userId);
};

export const getShipmentByIdService = async (shipmentId: number) => {
  return await getShipmentByIdRepository(shipmentId);
};

export const getShipmentHistoryService = async (shipmentId: number) => {
  return await getShipmentHistoryRepository(shipmentId);
};

export const getPendingShipmentsService = async () => {
  return await getPendingShipmentsRepository();
};

export const assignRouteAndCarrier = async (
  shipmentId: number,
  routeId: number,
  carrierId: number
) => {
  // Validar existencia del envío
  const shipment = await ShipmentRepository.getShipmentById(shipmentId);
  if (!shipment) {
    throw new Error("Envío no encontrado");
  }

  if (shipment.status !== "pending") {
    throw new Error("Solo se pueden asignar rutas a envíos pendientes");
  }

  // Validar existencia y disponibilidad del transportista
  const carrier = await CarrierModel.getCarrierById(carrierId);
  if (!carrier || !carrier.available) {
    throw new Error("El transportista no está disponible o no existe");
  }

  // Validar existencia de la ruta
  const route = await RouteModel.getRouteById(routeId);
  if (!route) {
    throw new Error("La ruta especificada no existe");
  }

  // Validar capacidad vs peso del paquete
  if (carrier.capacity < shipment.weight) {
    throw new Error("El transportista no tiene la capacidad suficiente para este envío");
  }

  // Actualizar envío
  const updatedShipment = await ShipmentRepository.assignRouteAndCarrier(
    shipmentId,
    routeId,
    carrierId
  );

  // Marcar transportista como no disponible
  await CarrierModel.updateCarrierAvailability(carrierId, false);
  await ShipmentStatusHistory.logShipmentStatusChange(shipmentId, 'in_transit');

  return updatedShipment;
};

export const getAllShipmentsService = async () => {
  try {
    const shipments = await getAllShipments();
    return shipments;
  } catch (error) {
    console.error("Error en el servicio de envíos:", error);
    throw new Error("No se pudieron obtener los envíos");
  }
};
