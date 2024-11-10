const prisma = require("../db.config.js");
const moment = require('moment');

module.exports.getAllStudent = async (req, res) => {
  try {
    const allStudent = await prisma.student.findMany();
    if (!allStudent) {
      return res.json({ status: false, message: "No Students Found" });
    }

    return res.json({ status: true, data: allStudent });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdStudent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }

    const getByIdStudent = await prisma.student.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.json({ status: true, data: getByIdStudent });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdStudent = async (req, res) => {
  const { admissionNumber, dob, gender, enrollmentDate } = req.body;
  console.log("updateByIdStudent=req.body=",req.body);
  console.log("updateByIdStudent=req.params=",req.params);
  
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
        dob: dob ,
        gender:gender,
        enrollmentDate: enrollmentDate,
      },
    });
    console.log("updateStudent==",updateStudent);
    
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
  console.log("createStudent controller ", req.body);

  const { admissionNumber, dob, gender, enrollmentDate } = req.body;

  const [day, month, year] = dob.split('/');
  const formattedDob = new Date(`${year}-${month}-${day}`);  
  
  const [eday, emonth, eyear] = enrollmentDate.split('/');
  const formattedEnrollmentDate = new Date(`${eyear}-${emonth}-${eday}`);

  try {
    // check user entries by  email
    const exiextStudent = await prisma.student.findFirst({
      where: {
        admissionNumber: admissionNumber,
      },
    });

    // console.log("exiextStudent==", exiextStudent);

    if (exiextStudent) {
      // Agar student already exist karta hai
      return res.json({
        status: false,
        message: "Student already exists, please use another admission number.",
      });
    }

    const newStudent = await prisma.student.create({
      data: {
        // userId: Number(userId),
        admissionNumber,
        dob: formattedDob,
        gender:gender.toUpperCase(),
        enrollmentDate: formattedEnrollmentDate,
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
