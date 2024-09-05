const { object, string, number, date, InferType } = require("yup");

module.exports.getAllStudentValidation = (req, res, next) => {
  console.log("student ===", req.body);

  return res.json("get all student");
};

module.exports.getByIdStudentValidation = (req, res, next) => {
  console.log("student ===", req.body);

  return res.json("get by id student");
};

let userSchema = object({
  admissionNumber: string().required("AdmissionNumber is required"),
  dob: string().required("Date of birth required"),
  gender: string().required("Gender is required"),
  enrollmentDate: string().required("EnrollmentDate is required"),
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

module.exports.updateStudentValidation = (req, res, next) => {
  console.log("student ===", req.body);

  return res.json("update student");
};

module.exports.deleteStudentValidation = (req, res, next) => {
  console.log("student ===", req.body);

  return res.json("delete student");
};
