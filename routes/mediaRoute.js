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

router.get("/media/:id", mediaController.getOne);

router.post("/media", validationCreate, mediaController.create);

router.put("/media", [validationUpdate], mediaController.update);

router.delete("/media", [validationDelete], mediaController.delete);

router.post("/media/update_picture", mediaController.updatePicture);//extra route

router.post("/media/send_email", mediaController.sendEmail);//extra route

module.exports = router;
