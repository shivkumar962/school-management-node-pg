const { object, string, number, date, InferType } = require("yup");

module.exports.getAllParentValidation = (req, res, next) => {
  // console.log("Parent ===", req.body);

  next();
};

let userSchemaGetByIdParentValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdParentValidation = (req, res, next) => {
  // console.log("Parent ===", req.params);

  try {
    userSchemaGetByIdParentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};

let userSchema = object({
  occupation: string().required("Occupation is required"),
  relationshipToStudent: string().required("Relationship to student is required"),
  userId:number().required("Id is required")
});
module.exports.postParentValidation = async (req, res, next) => {
  console.log("Parent ===", req.body);
  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.updateParentValidation = async (req, res, next) => {
  // console.log("Parent ===", req.body);

  try {
    await userSchemaGetByIdParentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.deleteParentValidation = async (req, res, next) => {
  console.log("Parent ===", req.body);
  try {
    await userSchemaGetByIdParentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};
