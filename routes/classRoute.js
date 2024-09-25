const { Router } = require("express");
const router = Router();
// import {classValidation} from "../middlewares/classMiddleware"
const { 
       getAllclassValidation,
       getByIdclassValidation,
       postclassValidation,
       updateclassValidation,
       deleteclassValidation
      } = require("../middlewares/classMiddleware")

const classController = require("../controllers/classController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/classController");


router.get('/class', getAllclassValidation , classController.getAllclass);

router.get('/class/:id', getByIdclassValidation, classController.getByIdclass);

router.post('/class', postclassValidation , classController.createclass);

router.put('/class/:id', updateclassValidation, classController.updateByIdclass);

router.delete('/class/:id', deleteclassValidation, classController.deleteByIdclass);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
