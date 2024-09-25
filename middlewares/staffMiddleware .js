const { object, string, number, date, InferType } = require("yup");

module.exports.getAllStaffValidation = (req, res, next) => {
  // console.log("Staff ===", req.body);

  next();
};

let userSchemaGetByIdStaffValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdStaffValidation = (req, res, next) => {
  // console.log("Staff ===", req.params);

  try {
    userSchemaGetByIdStaffValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};

let userSchema = object({
  staffNumber: string().required("Staff number is required"),
  dob: string().required("Date of birth required"),
  gender: string().required("Gender is required"),
  role: string().required("Role is required"),
  salary: number().required("Salary is required"),
});
module.exports.postStaffValidation = async (req, res, next) => {
  console.log("Staff ===", req.body);
  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.updateStaffValidation = async (req, res, next) => {
  // console.log("Staff ===", req.body);

  try {
    await userSchemaGetByIdStaffValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.deleteStaffValidation = async (req, res, next) => {
  console.log("Staff ===", req.body);
  try {
    await userSchemaGetByIdStaffValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};
