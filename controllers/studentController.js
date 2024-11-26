const { orderBy } = require("lodash");
const prisma = require("../db.config.js");
const moment = require("moment");

module.exports.getAllStudent = async (req, res) => {
  console.log("paramId", req.params);

  try {
    const where = {};
    let result = null;

    if (req.params.studentId) {
      result = await prisma.student.findFirst({
            where: {
              id: Number(req.params.studentId),
            },
          });
    } 
    else if(req.params.classId) {
      result = await prisma.student.findMany({
        where: {
          currentClassId: Number(req.params.classId),
        },
      });
    }else{
      result = await prisma.student.findMany();
    }


    // if (req.params.studentId) {
    //   // console.log("getByIdStudent===");
    //   where.id = Number(req.params.studentId);
    //   result = await prisma.student.findFirst({
    //     where: {
    //       id: Number(req.params.studentId),
    //       currentClassId: currentClassId
    //     },
    //   });
    //   // console.log("getByIdStudent===", getByIdStudent);
    // } else {
      
    //   result = await prisma.student.findMany({
    //     where: {
    //       currentClassId: currentClassId,
    //     },
    //   });
    // }


    console.log('result==',result);

    if (!result) {
      return res.json({ status: false, message: "No Students Found" });
    }

    return res.json({ status: true, data: result });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};



module.exports.updateByIdStudent = async (req, res) => {
  const { admissionNumber, dob, gender, enrollmentDate } = req.body;
  console.log("updateByIdStudent=req.body=", req.body);
  console.log("updateByIdStudent=req.params=", req.params);

  // const [day, month, year] = dob.split('/');
  // const formattedDob = new Date(`${year}-${month}-${day}`);

  // const [eday, emonth, eyear] = enrollmentDate.split('/');
  // const formattedEnrollmentDate = new Date(`${eyear}-${emonth}-${eday}`);
  // const newDate = moment(dob).format('YYYY-MM-DD HH:MM:SS');
  // console.log('newDate-->>llllll',newDate);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    // const exiextStudentAdmissionNumber = prisma.student.findFirst({
    //   where: {
    //     admissionNumber: admissionNumber,
    //   },
    // });

    // if (exiextStudentAdmissionNumber) {
    //   return res.json({
    //     status: false,
    //     message: "Already exiest admission number",
    //   });
    // }
    const updateStudent = await prisma.student.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        admissionNumber: admissionNumber,
        dob: dob,
        gender: gender,
        enrollmentDate: enrollmentDate,
      },
    });
    console.log("updateStudent==", updateStudent);

    return res.json({
      status: true,
      message: "Student successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};



module.exports.deleteByIdStudent = async (req, res) => {
  console.log("student ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteStudent = await prisma.student.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "Student delete successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};


// Create Student
module.exports.createStudent = async (req, res) => {
  console.log("createStudent controller ==>", req.body);

  const {
    studentFullName,
    fatherName,
    motherName,
    contactNumber,
    studentAadharCardNumber,
    emailAddress,
    dob,
    enrollmentDate,
    homeAddress,
    currentClassId,
    gender,
    religion,
    category,
    admissionNumber,
    classId,
  } = req.body;

  const [day, month, year] = dob.split("/");
  const formattedDob = new Date(`${year}-${month}-${day}`);

  const [eday, emonth, eyear] = enrollmentDate.split("/");
  const formattedEnrollmentDate = new Date(`${eyear}-${emonth}-${eday}`);

  try {
    // check user entries by  email
    const exiextStudent = await prisma.student.findFirst({
      where: {
        admissionNumber: admissionNumber,
      },
    });
    const exiextStudentAadharCardNumber = await prisma.student.findFirst({
      where: {
        studentAadharCardNumber: studentAadharCardNumber,
      },
    });
    // console.log("exiextStudent==", exiextStudent);
    // console.log("exiextStudentAadharCardNumber==", exiextStudentAadharCardNumber);

    if (exiextStudent || exiextStudentAadharCardNumber) {
      // Agar student already exist karta hai
      if (exiextStudent) {
        return res.json({
          status: false,
          message:
            "Student already exists, please use another Admission Number.",
        });
      }
      return res.json({
        status: false,
        message:
          "Student already exists, please use another Student Aadhar Card Number.",
      });
    }

    const newStudent = await prisma.student.create({
      data: {
        // userId: Number(userId),
        studentFullName: studentFullName,
        fatherName: fatherName,
        motherName: motherName,
        contactNumber: contactNumber,
        studentAadharCardNumber: studentAadharCardNumber,
        emailAddress: emailAddress,
        dob: formattedDob,
        enrollmentDate: formattedEnrollmentDate,
        homeAddress: homeAddress,
        currentClassId: Number(currentClassId),
        gender: gender.toUpperCase(),
        religion: religion,
        category: category,
        admissionNumber: admissionNumber,
      },
    });

    const classStudentModel = await prisma.classStudentMapping.create({
      data: {
        classId: Number(currentClassId),
        studentId: Number(newStudent.id),
        createdBy: 0,
        updatedBy: 0,
      },
    });

    return res.json({
      status: true,
      message: "Created new student",
      student: newStudent,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
};
