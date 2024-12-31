const { Router } = require("express");
const router = Router();
// import {studentValidation} from "../middlewares/studentMiddleware"
const { 
      getAllSubjectValidation,
      getByIdSubjectValidation,
      postSubjectValidation,
      updateSubjectValidation,
      deleteSubjectValidation
      } = require("../middlewares/subjectMiddleware")

const subjectController = require("../controllers/subjectController")

// const mediaUploadMiddleware = require('../middlewares/mediaUploadMiddleware');
// const mediaController = require("../controllers/studentController");


router.get('/subject', getAllSubjectValidation , subjectController.getAllSubject);

router.get('/subject/:id', getByIdSubjectValidation, subjectController.getByIdSubject);

router.post('/subject', postSubjectValidation , subjectController.createSubject);

router.post('/subjectmapp' , subjectController.createSubjectInClassSubjectMapping);

router.put('/subject/:id', updateSubjectValidation, subjectController.updateByIdSubject);

router.delete('/subject/:id', deleteSubjectValidation, subjectController.deleteByIdSubject);

// router.post("/addMediaImage",mediaUploadMiddleware.uploadMedia(constants.mediaTypes.design) , mediaController.addMediaImage);



module.exports = router;
