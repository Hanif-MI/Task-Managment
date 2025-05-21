import { ApiError } from "../utility/api-error.js";

const validate =
  (schema, target = ValidationTarget.BODY) =>
  (req, res, next) => {
    const { error } = schema.validate(req[target], { abortEarly: false }); 
    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      return res.send(new ApiError(422, error?.details?.[0].message,error?.details?.[0].message));
    }

    next();
  };

const ValidationTarget = {
  BODY: "body",
  QUERY: "query",
  PARAMS: "params",
};

export { validate, ValidationTarget };
