require("dotenv").config();
// Load model
const { Designs, Media } = require("../db");
const { Op } = require("sequelize");

const utils = require("../utils");
const nodemailer = require("nodemailer");
var formidable = require("formidable");
var fs = require("fs");
const constants = require("../constants");
// Get All
module.exports.getAll = async (req, res, next) => {
  // console.log("design controller get all");

  try {
    const designs = await Designs.findAll();
    res.json({
      status: "success",
      result: designs,
    });
  } catch (err) {
    return next(err);
  }
};

// Get One
module.exports.getOne = async (req, res, next) => {
  // console.log("design controller get one",req.body);

  try {
    const id = req.params.id;
    const design = await Designs.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      status: "success",
      result: design,
    });
  } catch (err) {
    return next(err);
  }
};

// Create
module.exports.create = async (req, res, next) => {
  // console.log('📂create data==',req.file.filename);
  const imageFilenames = req.files.map((file) => file.filename); // []
  console.log("📂create data==", req.body);
  console.log("imageFilenames data==", imageFilenames);

  try {
    const createResult = await Designs.create({
      designName: req.body.designName,
      price: req.body.price,
      image: imageFilenames,
    });

    console.log("📂createResult:--===>", createResult.dataValues.image);

    const userId = null;
    const createdBy = null;

    if (req.files && req.files.length > 0) {
      const mediaRecords = createResult.dataValues.image.map((image) => ({
        type: constants.mediaTypes.design,
        designId: createResult.dataValues.id,
        image: image,
        userId: userId || null,
        createdBy: createdBy || null,
        recordStatus: true,
      }));
      await Media.bulkCreate(mediaRecords);
    }
    console.log("Images successfully stored in separate rows");

    res.json({
      status: "success",
      result: {
        record: createResult,
      },
    });
  } catch (err) {
    console.log("Images successfully stored in separate rows err", err);

    return next(err);
  }
};

// Update
module.exports.update = async (req, res, next) => {
  // console.log("design update",req.body)
  try {
    const id = req.body.id;
    const design = req.body.designName;
    const price = req.body.price;

    const record = await Designs.update(
      {
        designName: design,
        price: price,
      },
      {
        // where: {
        // 	id: {
        // 		[Op.eq]: id,
        // 	},
        // },
        where: {
          id: id,
        },
      }
    );

    res.json({
      status: "success",
      result: {
        record: record,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// Delete
module.exports.delete = async (req, res, next) => {
  // console.log("❌ delete record ",req.body, "❌");

  try {
    const id = req.body.id;

    const deleted = await Designs.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    res.json({
      status: "success",
      result: {
        affectedRows: deleted,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// Update Picture
module.exports.updatePicture = (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const id = fields.id;

    if (!id) {
      var err = new Error("ID not found.");
      return next(err);
    } else {
      if (
        files.filetoupload.name &&
        !files.filetoupload.name.match(/\.(jpg|jpeg|png)$/i)
      ) {
        var err = new Error("Please select .jpg or .png file only");
        return next(err);
      } else if (files.filetoupload.size > 2097152) {
        var err = new Error("Please select file size < 2mb");
        return next(err);
      } else {
        var newFileName = utils.timestampFilename(files.filetoupload.name);

        var oldpath = files.filetoupload.path;
        var newpath = __basedir + "/public/uploads/pictures/" + newFileName;
        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            return next(err);
          }

          Designs.update(
            {
              picture: newFileName,
            },
            {
              where: {
                id: {
                  [Op.eq]: id,
                },
              },
            }
          )
            .then((updated) => {
              res.json({
                status: "success",
                result: {
                  newFileName: newFileName,
                  affectedRows: updated,
                },
              });
            })
            .catch((err) => {
              return next(err);
            });
        });
      }
    }
  });
};

// Send email
module.exports.sendEmail = async (req, res, next) => {
  try {
    const id = req.body.id;
    const result = await Designs.findOne({
      where: {
        id: id,
      },
    });

    var transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_POST,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_FROM,
      to: "test@example.com",
      subject: "Test email",
      html: `Hi there! <br/><br/>
			This is just a test email from boilerplate code<br/><br/>
			Your design is: ${result.design}<br/><br/>
			Thank You.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(err);
  }
};
