const { object, string, number, date, InferType } = require("yup");

module.exports.getAllExamValidation = (req, res, next) => {
  // console.log("getAllExamValidation ===", req.body);
  next();
};



let userSchemaGetByIdStudentValidation = object({
  id: string().required("Id is required"),
});
module.exports.getByIdExamValidation = (req, res, next) => {
  // console.log("getByIdExamValidation ===", req.params);

  try {
    userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "Server error" });
  }
};




let userSchema = object({
  examName: string().required("Exam name is required"),
});
module.exports.postExamValidation = async (req, res, next) => {
  // console.log("postExamValidation ===", req.body);

  try {
    await userSchema.validate(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};




module.exports.updateExamValidation = async (req, res, next) => {
  // console.log("updateExamValidation ===", req.body);

  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error });
  }
};




module.exports.deleteExamValidation = async (req, res, next) => {
  // console.log("deleteExamValidation ===", req.body);

  try {
    await userSchemaGetByIdStudentValidation.validate(req.params);
    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};




