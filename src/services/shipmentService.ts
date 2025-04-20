import { createShipment } from "../repository/ShipmentRepository";
import { generateTrackingNumber } from "../utils/tracking";


export const createShipmentService = async (data: any) => {
  const trackingNumber = generateTrackingNumber();
  const shipmentData = {
    ...data,
    tracking_number: trackingNumber,
    status: "pending"
  };

  const newShipment = await createShipment(shipmentData);
  return newShipment;
};
