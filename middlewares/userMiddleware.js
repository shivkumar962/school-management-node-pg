const yup = require("yup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../db.config")


// Define the validation schema
let userSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
    phone: yup
    .string()
    .min(10, "phone number must be at least 10 characters ")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Middleware function for validation
module.exports.validationSignup = async (req, res, next) => {
  console.log("validationSignup", req.body);

  try {
    await userSchema.validate(req.body, { abortEarly: false });

    next();
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errors: err.errors,
    });
  }
};

module.exports.isUserExistsSignup = async (req, res, next) => {
  console.log("isUserExistsSignup", req.body);

  try {
    const user = await prisma.User.findUnique({
      where: {
        email: req.body.email,
        //   password: req.body.password,
      },
    });

    console.log("user===", user);

    if (user) {
      return res.json({ status: false, message: "user already exists" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

let uservalidateLogin = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

module.exports.validateLogin = async (req, res, next) => {
  // console.log("validateLogin =>=>=>", req.body);

  try {
    await uservalidateLogin.validate(req.body, { abortEarly: false });

    next();
  } catch (error) {
    // console.log("validation error ====---->", error);
    return res.json({ message: "please fill correct data", error: error });
  }
};


// state full auth check
module.exports.isAuthenticated = async (req, res, next) => {
	var token = req.headers.authorization;
  console.log('isAuthenticated--->>> ',token);
  
	if (token) {
		// verifies secret and checks if the token is expired

    const user = await User.findOne({
      where: {
        loginToken: token,
        loginExpiry: {
          [Op.gt]: new Date(Date.now()) 
        }
      },
    });
    // console.log("user date 1===",new Date(Date.now()));
    // console.log("user date 2===", new Date(Date.now() + 60 * 60 * 1000));


    if (!user) {
      return res.json({ status: false, message: "un authenticated user" });
    }
    next();
	} else {
		let err = new Error('Unauthorized');
		err.field = 'login';
		return next(err);
	}
};