const { object, string, number, date, InferType } = require("yup");

module.exports.getAllStudentValidation = (req, res, next) => {
  // console.log("student ===", req.body);

  next();
};

let userSchemaGetByIdStudentValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdStudentValidation = (req, res, next) => {
  // console.log("student ===", req.params);

  try {
    userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};

let userSchema = object({
  admissionNumber: string().required("AdmissionNumber is required"),
  dob: string().required("Date of birth required"),
  gender: string().required("Gender is required"),
  // enrollmentDate: string().required("EnrollmentDate is required"),
});
module.exports.postStudentValidation = async (req, res, next) => {
  console.log("student ===", req.body);

  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.updateStudentValidation = async (req, res, next) => {
  // console.log("student ===", req.body);

  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};

module.exports.deleteStudentValidation = async (req, res, next) => {
  console.log("student ===", req.body);
  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

