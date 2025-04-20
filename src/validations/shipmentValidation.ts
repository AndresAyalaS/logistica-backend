import Joi from "joi";

export const validateShipment = (data: any) => {
  const schema = Joi.object({
    weight: Joi.number().positive().required(),
    dimensions: Joi.object({
      length: Joi.number().positive().required(),
      width: Joi.number().positive().required(),
      height: Joi.number().positive().required(),
    }).required(),
    product_type: Joi.string().max(100).required(),
    origin_address: Joi.string().required(),
    destination_address: Joi.string().required(),
  });

  return schema.validate(data);
};
