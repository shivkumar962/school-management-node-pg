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

const {isAuthenticated} = require('../middlewares/userMiddleware')

const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
const constants = require('../constants');
// Define your route

// Import Controllers
const designController = require("../controllers/designController");

// TODO: request params validation
router.get("/design", isAuthenticated ,designController.getAll);

router.get("/design/:id",isAuthenticated, designController.getOne);

router.get("/designgetById/:id",isAuthenticated, designController.getById); //design table getById with media left join  

router.post("/design", mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , validationCreate, isDesignExistsCreate, designController.create);

// router.post("/addNewDesignImage", mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design),[validationUpdate], designController.addNewDesignImage); //add new designImage

router.delete("/design",isAuthenticated, [validationDelete], designController.delete);

router.post("/design/update_picture", designController.updatePicture);//extra route

router.post("/design/send_email", designController.sendEmail);//extra route

module.exports = router;
