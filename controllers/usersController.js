const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const prisma = require("../db.config.js");

module.exports.userGetAllData = async (req, res, next) => {
  // console.log("userGetAllData");
  
  try {
    const userAllData = await prisma.user.findMany();

    return res.json({ status: true, data: userAllData });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.signUp = async (req, res, next) => {
  // console.log("Entry signup ===>", req.body);

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    var token = crypto.randomBytes(16).toString("hex");

    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: "STUDENT",
        token: token,
        password: hashedPassword,
      },
    });

    // console.log("signup user", user);

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "shivamalviya84@gmail.com",
        pass: "pfdx qxsw xujt wtwf", // Ensure this is an app-specific password
      },
    });

    // const verificationLink = `http://localhost:3000/user/signup/verify/${token}`;
    const verifyButton = `http://localhost:3001/verify/${token}`;

    // Send email
    const info = await transporter.sendMail({
      from: '"Bangel 👻" <shivamalviya84@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Email Verification ✔", // Subject line
      text: "Please verify your email", // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #333;">Congratulations!</h2>
          <p style="font-size: 16px; color: #555;">
            You have successfully signed up. Please click the button below to verify your account:
          </p>
          <a href="${verifyButton}" target="_blank" style="
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            border-radius: 5px;
            text-decoration: none;
            ">
            Verify Email
          </a>
          <p style="font-size: 14px; color: #777; margin-top: 20px;">
            If you did not create this account, please ignore this email.
          </p>
          <p style="font-size: 14px; color: #777; margin-top: 20px;">
            Thank you,
            <br/>The Team
          </p>
        </div>
      `, // HTML body
    });

    // console.log("Message sent: %s", info.messageId);

    return res.json({ status: true, message: "registration successful 😊" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Registration failed 😞" });
  }
};

module.exports.signUpVerify = async (req, res, next) => {
  // console.log("signUpVerify =>=>=>");

  try {
    const token = req.params.token;
    // console.log("token =>=>=>ww", token);

    if (token) {
      const verify = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });
      // console.log("verify =>=>=>", verify);
      if (verify) {
        const is_verified = await prisma.user.update({
          where: {
            token: verify.token,
          },

          data: {
            is_verified: true,
            // token: null,
          },
        });

        return res.json({ status: true, message: "User verified" });
      }
      return res.json({ status: false, message: "user not verified" });
    }

    return res.json({ status: false, message: "user not verified" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginJWT = async (req, res, next) => {
  // console.log("validateLogin =>=>=>");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // console.log("isUserExistsLogin==123>", user);
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // console.log("isMatch==>", isMatch);

    if (!isMatch) {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }

    if (!user.is_verified) {
      return res.json({
        status: false,
        message: "user not verified",
      });
    }

    const token = jwt.sign({ id: user.id }, "jwt_secret_key", {
      expiresIn: "1h",
    });
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000);

    // console.log("user token  ====>>>", token);

    const userLogin = await prisma.user.update({
      where: {
        token: user.token,
      },

      data: {
        loginToken: token,
        loginExpiry: expiryTime,
      },
    });

    return res.json({
      status: true,
      message: "login successfull",
      user: user,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "server error",
      error: error,
    });
  }
};

module.exports.login = async (req, res, next) => {
  // console.log("validateLogin =>=>=>", req.body);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    // console.log("isUserExistsLogin==123>", user);
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // console.log("isMatch==>", isMatch);

    if (!isMatch) {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }

    if (!user.is_verified) {
      return res.json({
        status: false,
        message: "user not verified",
      });
    }

    const token = crypto.randomBytes(16).toString("hex");
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000);

    // console.log("user token  ====>>>", token);

    const userLogin = await prisma.user.update({
      where: {
        token: user.token,
      },
      data: {
        loginToken: token,
        loginExpiry: expiryTime,
      },
    });

    const userDetail = await prisma.user.findFirst({
      where: {
        loginToken: token,
      },
    });
    // console.log("userLogin detail--->>>", userDetail);

    return res.json({
      status: true,
      message: "login successfull",
      user: userDetail,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      status: false,
      message: "server error",
      error: error,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  // console.log("body data", req.body);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const userUpdate = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      },
    });
    // console.log("userUpdate==", userUpdate);

    return res.json({ status: true, message: "User update sucessfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
};


module.exports.getByIdUser = async(req, res) => {
  // console.log('controller get By Id User');
  // console.log("body data", req.params.id);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const userGetById = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    
    });
    // console.log("userGetById==", userGetById);

    return res.json({ status: true, userData:userGetById });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
}




module.exports.userdelete = async (req, res) => {
  // console.log("body data", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const exiestUser = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!exiestUser) {
      return res.json({ status: false, message: "User not exiext" });

    }
    const userDelete = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    // console.log("userDelete==", userDelete);

    return res.json({ status: true, message: "User delete sucessfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
};
