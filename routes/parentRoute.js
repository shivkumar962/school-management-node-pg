const { Router } = require("express");
const router = Router();
// import {ParentValidation} from "../middlewares/ParentMiddleware"
const { 
       getAllParentValidation,
       getByIdParentValidation,
       postParentValidation,
       updateParentValidation,
       deleteParentValidation
      } = require("../middlewares/parentMiddleware")

const parentController = require("../controllers/parentController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/ParentController");


router.get('/parent', getAllParentValidation , parentController.getAllParent);

router.get('/parent/:id', getByIdParentValidation, parentController.getByIdParent);

router.post('/parent', postParentValidation , parentController.createParent);

router.put('/parent/:id', updateParentValidation, parentController.updateByIdParent);

router.delete('/parent/:id', deleteParentValidation, parentController.deleteByIdParent);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
