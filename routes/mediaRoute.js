const { Router } = require("express");
const router = Router();

// Import Middlewares
const {
  validationCreate,
  isMediaExistsCreate,
  validationUpdate,
  isMediaExistsUpdate,
  validationDelete,
} = require("../middlewares/mediaMiddleware");

const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
const constants = require('../constants');
// Define your route

// Import Controllers
const mediaController = require("../controllers/mediaController");

router.get("/media", mediaController.getAll);

router.get("/media/:id", mediaController.getByDesignId);

router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
