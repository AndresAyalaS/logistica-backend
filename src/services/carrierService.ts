import { CarrierInput } from "types/carrier";
import { createCarrier, getAllCarriers, getCarrierById } from "../repository/carrierModel";

export const createNewCarrier = async (carrierData: CarrierInput) => {
  return await createCarrier(carrierData);
};

export const fetchAllCarriers = async () => {
  return await getAllCarriers();
};

export const fetchCarrierById = async (id: number) => {
  return await getCarrierById(id);
};