const { orderBy } = require("lodash");
const prisma = require("../db.config.js");
const moment = require("moment");

module.exports.getAllSubject = async (req, res) => {
  console.log("getAllSubject==>>>123");

  try {
    const allSubject = await prisma.subject.findMany({
      orderBy:{
        subjectName:'asc'
      }
    });
    if (!allSubject) {
      return res.json({ status: false, message: "No Subjects Found" });
    }

    return res.json({ status: true, data: allSubject });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdSubject = async (req, res) => {
  console.log("enter getByIdSubject-->nkk");
  
  
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }
    console.log("start enter getByIdSubject-->");

    const getByIdSubjects = await prisma.subject.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    console.log("end getByIdSubject-->",getByIdSubjects);

    return res.json({ status: true, data: getByIdSubjects });

  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdSubject = async (req, res) => {

  const { subjectName, subjectCode } = req.body;
  console.log("updateByIdSubject=req.body=", req.body);
  console.log("updateByIdSubject=req.params=", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    const updateSubject = await prisma.subject.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        subjectName: subjectName,
        subjectCode: subjectCode
      },
    });
    console.log("updateSubject==", updateSubject);

    return res.json({
      status: true,
      message: "Subject successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.deleteByIdSubject = async (req, res) => {

  console.log("Subject ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteSubject = await prisma.subject.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "Subject delete successfully" });
    
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

// Create Subject
  module.exports.createSubject = async (req, res) => {
    console.log("createSubject controller ==>", req.body);
  
    const { subjectName , subjectCode} = req.body;
  
    try {
      // Check if Subject already exists
      const exiextSubject = await prisma.subject.findFirst({
        where: { subjectCode:subjectCode },
      });
      if (exiextSubject) {
        
        // Subject exists, response and stop further execution
        return res.json({ status: false, message: "Subject code already exists, please use another Subject code.",});
      }
  
      // Create new Subject
      const newSubject = await prisma.subject.create({

        data: { 
                subjectName: subjectName,
                subjectCode:subjectCode
              },
      });
  
      // Send success response
      return res.json({ status: true, message: "Created new Subject", subject: newSubject,});

    } catch (error) {
      console.error(error);
      // Error response
      return res.json({  status: false, message: "Server error",});
    }
  };
  
