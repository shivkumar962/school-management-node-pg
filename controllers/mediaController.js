require("dotenv").config();

const utils = require("../utils");
const nodemailer = require("nodemailer");
var formidable = require("formidable");
var fs = require("fs");
const constants = require("../constants");

// Get All
module.exports.getAll = async (req, res, next) => {
  // console.log("design controller get all");

  try {
    const media = await Media.findAll();
    res.json({
      status: "success",
      result: media,
    });
  } catch (err) {
    return next(err);
  }
};

// Get One
module.exports.getByDesignId = async (req, res, next) => {
  // console.log("design controller get one",req.body);

  try {
    const id = req.params.id;
    const media = await Media.findAll({
      where: {
        designId: id,
      },
    });
    res.json({
      status: "success",
      result: media,
    });
  } catch (err) {
    return next(err);
  }
};

// addMediaImage
module.exports.addMediaImage = async (req, res, next) => {
  console.log("addMediaImage controller ", req.body);
  console.log("addMediaImage controller file", req.files[0].filename);

  try {
    const id = req.body.id;
    const image = req.files[0].filename;
    const type = constants.mediaTypes.design;

    const addMediaImage = await Media.create({
      type: type,
      designId: id,
      image: image,
    });
    console.log("addMediaImage-=-=-=", addMediaImage);

    const design = await Designs.findOne({ where: { id: id } });
    console.log("design==", design.dataValues.image);

    if (design.dataValues.image) {
      let imagesArray = design.dataValues.image || [];
      console.log("imagesArray===", imagesArray);

      imagesArray.push(image);
      console.log("imagesArray===", imagesArray);

      await Designs.update({ image: imagesArray }, { where: { id: id } });

      console.log("Updated images array:", imagesArray);

      res.json({
        status: "success",
        result: addMediaImage,
      });
    }
  } catch (err) {
    return next(err);
  }
};
