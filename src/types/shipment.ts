export interface Shipment {
    user_id: number;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    product_type: string;
    origin_address: string;
    destination_address: string;
  }
  