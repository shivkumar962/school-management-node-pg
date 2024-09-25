const { object, string, number, date, InferType } = require("yup");

module.exports.getAllclassValidation = (req, res, next) => {
  // console.log("class ===", req.body);

  next();
};

let userSchemaGetByIdclassValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdclassValidation = (req, res, next) => {
  // console.log("class ===", req.params);

  try {
    userSchemaGetByIdclassValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};

let userSchema = object({
  className: string().required("class name is required"),
  section: string().required("Section is required"),
});
module.exports.postclassValidation = async (req, res, next) => {
  console.log("class ===", req.body);
  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.updateclassValidation = async (req, res, next) => {
  // console.log("class ===", req.body);

  try {
    await userSchemaGetByIdclassValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.deleteclassValidation = async (req, res, next) => {
  console.log("class ===", req.body);
  try {
    await userSchemaGetByIdclassValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};
