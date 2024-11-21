const { Router } = require("express");
const router = Router();
// import {studentValidation} from "../middlewares/studentMiddleware"
const { 
      getAllExamValidation,
      getByIdExamValidation,
      postExamValidation,
      updateExamValidation,
      deleteExamValidation
      } = require("../middlewares/examMiddleware")

const examController = require("../controllers/examController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/studentController");


router.get('/exam', getAllExamValidation , examController.getAllExam);

router.get('/exam/:id', getByIdExamValidation, examController.getByIdExam);

router.post('/exam', postExamValidation , examController.createExam);

router.put('/exam/:id', updateExamValidation, examController.updateByIdExam);

router.delete('/exam/:id', deleteExamValidation, examController.deleteByIdExam);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
