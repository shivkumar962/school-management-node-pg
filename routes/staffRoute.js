const { Router } = require("express");
const router = Router();
// import {StaffValidation} from "../middlewares/StaffMiddleware"
const { 
       getAllStaffValidation,
       getByIdStaffValidation,
       postStaffValidation,
       updateStaffValidation,
       deleteStaffValidation
      } = require("../middlewares/staffMiddleware ")

const staffController = require("../controllers/staffController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/StaffController");


router.get('/staff', getAllStaffValidation , staffController.getAllStaff);

router.get('/staff/:id', getByIdStaffValidation, staffController.getByIdStaff);

router.post('/staff', postStaffValidation , staffController.createStaff);

router.put('/staff/:id', updateStaffValidation, staffController.updateByIdStaff);

router.delete('/staff/:id', deleteStaffValidation, staffController.deleteByIdStaff);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
