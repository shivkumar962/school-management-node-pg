const { User } = require("../db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { where } = require("sequelize");

module.exports.signUp = async (req, res, next) => {
  // console.log("signup success");

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log("salt==", salt);
    // console.log("hashedPassword==", hashedPassword);

    var token = crypto.randomBytes(16).toString("hex");

    const user = User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      token: token,
    });

    // res.json({ status: true, message: "registration successfull 😊" });

    //send email

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ofelia.oreilly55@ethereal.email",
        pass: "v7bZNmbQS9eDAWXKTM",
      },
    });

    const verificationLink = `http://localhost:3000/user/signup/verify/${token}`;

    const info = await transporter.sendMail({
      from: '"send email 👻" <ofelia.oreilly55@ethereal.email>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `Congratulations!<br/><br/>
        You have successfully signed up. Please click the link below to verify your account:<br/>
        <a href="${verificationLink}" target="_blank">Verify email</a><br/><br/>
        Thank you.`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    return res.json({ status: true, message: "registration successfull 😊" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.signUpVerify = async (req, res, next) => {
  // console.log("signUpVerify =>=>=>");

  try {
    const token = req.params.token;
    console.log("token =>=>=>", token);

    if (token) {
      const verify = await User.findOne({
        where: {
          token: token,
        },
      });
      console.log("verify =>=>=>", verify.token);
      if (verify) {
        const is_verified = await User.update(
          {
            is_verified: true,
            token: null,
          },
          {
            where: {
              token: verify.token,
            },
          }
        );

        return res.json({ status: true, message: "User verified" });
      }
    }

    return res.json({ status: false, message: "user not verified" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginJWT = async (req, res, next) => {
  console.log("validateLogin =>=>=>");

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log("isUserExistsLogin==123>", user);
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("isMatch==>", isMatch);

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

    console.log("user token  ====>>>", token);

    const userLogin = await User.update(
      {
        loginToken: token,
        loginExpiry: expiryTime,
      },
      {
        where: { token: user.token },
      }
    );

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
  console.log("validateLogin =>=>=>");

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log("isUserExistsLogin==123>", user);
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("isMatch==>", isMatch);

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

    console.log("user token  ====>>>", token);

    const userLogin = await User.update(
      {
        loginToken: token,
        loginExpiry: expiryTime,
      },
      {
        where: { token: user.token },
      }
    );

    console.log('userLogin--->>>',userLogin);
    
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
