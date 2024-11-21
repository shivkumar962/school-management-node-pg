const { object, string, number, date, InferType } = require("yup");

module.exports.getAllSubjectValidation = (req, res, next) => {
  console.log("getAllSubjectValidation ===", req.body);
  next();
};



let userSchemaGetByIdStudentValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdSubjectValidation = (req, res, next) => {
  // console.log("getByIdSubjectValidation ===", req.params);

  try {
    userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};




let userSchema = object({
  subjectName: string().required("Subject name is required"),
  subjectCode: string().required("Subject code is required"),
});
module.exports.postSubjectValidation = async (req, res, next) => {
  // console.log("postSubjectValidation ===", req.body);

  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};




module.exports.updateSubjectValidation = async (req, res, next) => {
  // console.log("updateSubjectValidation ===", req.body);

  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};




module.exports.deleteSubjectValidation = async (req, res, next) => {
  // console.log("deleteSubjectValidation ===", req.body);

  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};




