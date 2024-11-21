const { orderBy } = require("lodash");
const prisma = require("../db.config.js");
const moment = require("moment");

module.exports.getAllExam = async (req, res) => {
  console.log("getAllExam==>>>");

  try {
    const allExam = await prisma.exam.findMany({
      // orderBy:{
      //   examName:'asc'
      // }
    });
    if (!allExam) {
      return res.json({ status: false, message: "No exams Found" });
    }

    return res.json({ status: true, data: allExam });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdExam = async (req, res) => {
  console.log("enter getByIdExam-->nkk");
  
  
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }
    console.log("start enter getByIdExam-->");

    const getByIdExams = await prisma.exam.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    console.log("end getByIdExam-->",getByIdExams);

    return res.json({ status: true, data: getByIdExams });

  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdExam = async (req, res) => {

  const { examName } = req.body;
  console.log("updateByIdexam=req.body=", req.body);
  console.log("updateByIdexam=req.params=", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    const updateExam = await prisma.exam.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        examName: examName
      },
    });
    console.log("updateexam==", updateExam);

    return res.json({
      status: true,
      message: "exam successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.deleteByIdExam = async (req, res) => {

  console.log("exam ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteExam = await prisma.exam.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "exam delete successfully" });
    
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

// Create exam
  module.exports.createExam = async (req, res) => {
    console.log("createexam controller ==>", req.body);
  
    const { examName } = req.body;
  
    try {
      // Check if exam already exists
      const exiextExam = await prisma.exam.findFirst({
        where: { examName },
      });
      if (exiextExam) {
        
        // Exam exists, response and stop further execution
        return res.json({ status: false, message: "Exam already exists, please use another exam name.",});
      }
  
      // Create new exam
      const newExam = await prisma.exam.create({
        data: { examName },
      });
  
      // Send success response
      return res.json({ status: true, message: "Created new exam", exam: newExam,});

    } catch (error) {
      console.error(error);
      // Error response
      return res.json({  status: false, message: "Server error",});
    }
  };
  
