const { Router } = require("express");
const router = Router();

// Import Middlewares
const {
  validationCreate,
  isDesignExistsCreate,
  validationUpdate,
  isDesignExistsUpdate,
  validationDelete,
} = require("../middlewares/designMiddleware");

const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
const constants = require('../constants');
// Define your route

// Import Controllers
const designController = require("../controllers/designController");

router.get("/design", designController.getAll);

router.get("/design/:id", designController.getOne);

router.post("/design", mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , validationCreate, isDesignExistsCreate, designController.create);

router.put("/design", [validationUpdate], designController.update);

router.delete("/design", [validationDelete], designController.delete);

router.post("/design/update_picture", designController.updatePicture);//extra route

router.post("/design/send_email", designController.sendEmail);//extra route

module.exports = router;
