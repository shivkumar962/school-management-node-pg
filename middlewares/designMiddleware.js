let yup = require("yup");
const { Designs } = require("../db");
const { Op } = require("sequelize");
// console.log("🐞 design middleware======>>>>>");

// ========================================================================

// Schema - Create
let schemaCreate = yup.object().shape({
  design: yup.string().required('design name is required'),
  price: yup.string().required('design price is required'),
  image: yup.string(),
});
// console.log("🐞 design middleware======>>>>>");

// Validation - Create
module.exports.validationCreate = (req, res, next) => {
  // console.log("🥳 validationCreate======>>>>>", req.body, "🥳");
  // console.log("📂 filename======>>>>>", req.file.filename, "📂");

  schemaCreate
    .validate(
      {
        design: req.body.designName,
	    	price: req.body.price,

      },
      { abortEarly: false }
    )
    .then(function () {
      next();
    })
    .catch(function (err) {
      return next(err);
    });
};

// Check if record exists - Create
module.exports.isDesignExistsCreate = async (req, res, next) => {
  // console.log("🥳 isDesignExistsCreate===>", req.body, "🥳");

  try {
    const design = await Designs.findOne({
      where: {
        designName: req.body.designName,
      },
    });
    console.log("Designs.findOne", design);

    if (design) {
      let err = new Error("design already exists");
      err.field = "design";
      return next(err);
    }

    next();
  } catch (err) {
    return next(err);
  }
};

// ========================================================================

// Schema - Update
let schemaUpdate = yup.object().shape({
  id: yup.number().required(),
  design: yup.string().required("name is required"),
  price: yup.string().required('price is required'),

  
});

// Validation - Update
module.exports.validationUpdate = (req, res, next) => {
  // validations here
  // console.log("🐞 validationUpdate==>",req.body);

  schemaUpdate
    .validate(
      {
        id: req.body.id,
        design: req.body.designName,
		price: req.body.price,
      },
      { abortEarly: false }
    )
    .then(function () {
      next();
    })
    .catch(function (err) {
      return next(err);
    });
};

// Check if record exists - Update
module.exports.isDesignExistsUpdate = async (req, res, next) => {
	// console.log("🐞 validationUpdate",req.body);


  try {
    const design = await Designs.findOne({
      where: {
        design: req.body.designName,
        id: {
          [Op.ne]: req.body.id,
        },
      },
    });

    if (design) {
      let err = new Error("design already exists");
      err.field = "design";
      return next(err);
    }

    next();
  } catch (err) {
    return next(err);
  }
};

// ========================================================================

// Schema - Delete
let schemaDelete = yup.object().shape({
  id: yup.number().required(),
});

// Validation - Delete
module.exports.validationDelete = (req, res, next) => {
  // validations here
  // console.log("🐞 validationDelete",req.body);

  schemaDelete
    .validate(
      {
        id: req.body.id,
      },
      { abortEarly: false }
    )
    .then(function () {
      next();
    })
    .catch(function (err) {
      return next(err);
    });
};
