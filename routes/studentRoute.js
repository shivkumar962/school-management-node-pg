const { Router } = require("express");
const router = Router();
// import {studentValidation} from "../middlewares/studentMiddleware"
const { 
       getAllStudentValidation,
       getByIdStudentValidation,
       postStudentValidation,
       updateStudentValidation,
       deleteStudentValidation
      } = require("../middlewares/studentMiddleware")

const studentController = require("../controllers/studentController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/studentController");


router.get('/students', getAllStudentValidation , studentController.getAllStudent);

router.get('/students/:id', getByIdStudentValidation, studentController.getByIdStudent);

router.post('/students', postStudentValidation , studentController.createStudent);

router.put('/students/:id', updateStudentValidation, studentController.updateByIdStudent);

router.delete('/students/:id', deleteStudentValidation, studentController.deleteByIdStudent);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
