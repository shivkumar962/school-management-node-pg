let yup = require("yup");
const { Media } = require("../db");
const { Op } = require("sequelize");
// console.log("🐞 design middleware======>>>>>");

// ========================================================================

// Schema - Create
let schemaCreate = yup.object().shape({
  type: yup.string().required(),
  designId: yup.string().required(),
  userId: yup.string().required(),
  recordStatus: yup.string(),
  createdBy: yup.string().required(),
  updatedBy: yup.string().required(),
 
});
// console.log("🐞 design middleware======>>>>>");

// Validation - Create
module.exports.validationCreate = (req, res, next) => {
  console.log("🥳 validationCreate======>>>>>", req.body, "🥳");
  // console.log("📂 filename======>>>>>", req.file.filename, "📂");

  schemaCreate
    .validate(
      {
	    	type: req.body.type,
	    	designId: req.body.designId,
	    	userId: req.body.userId,
	    	recordStatus: req.body.recordStatus,
	    	createdBy: req.body.createdBy,
	    	updatedBy: req.body.updatedBy,

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
module.exports.isMediaExistsCreate = async (req, res, next) => {
  // console.log("🥳 isDesignExistsCreate===>", req.body, "🥳");

  try {
    const media = await Media.findOne({
      where: {
        designName: req.body.designName,
      },
    });
    console.log("Media.findOne", media);

    if (media) {
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
  id: yup.string().required(),
  type: yup.string().required(),
  designId: yup.string().required(),
  userId: yup.string().required(),
  recordStatus: yup.string(),
  createdBy: yup.string().required(),
  updatedBy: yup.string().required(),
 
  
});

// Validation - Update
module.exports.validationUpdate = (req, res, next) => {
  // validations here
  // console.log("🐞 validationUpdate==>",req.body);

  schemaUpdate
    .validate(
      { id:req.body.id,
        type: req.body.type,
	    	designId: req.body.designId,
	    	userId: req.body.userId,
	    	recordStatus: req.body.recordStatus,
	    	createdBy: req.body.createdBy,
	    	updatedBy: req.body.updatedBy,
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
    const media = await Media.findOne({
      where: {
        design: req.body.designName,
        id: {
          [Op.ne]: req.body.id,
        },
      },
    });

    if (media) {
      let err = new Error("Media already exists");
      err.field = "media";
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
