const  prisma  = require("../db.config.js");

// Create Student
module.exports.createStudent = async (req, res, next) => {
  console.log("createStudent controller ", req.body);

  const { admissionNumber, dob, gender, enrollmentDate,userId } = req.body;

  try {
    const exiextStudent = await prisma.student.findFirst({
      where: {
        admissionNumber: admissionNumber,
      },
    });

    console.log("exiextStudent==", exiextStudent);

    if (exiextStudent) {  // Agar student already exist karta hai
      return res.json({
        status: false,
        message: "Student already exists, please use another admission number.",
      });
    }

    const newStudent = await prisma.student.create({
      data: {
        userId: Number(userId),
        admissionNumber,
        dob: new Date(dob),
        gender,
        enrollmentDate: new Date(enrollmentDate),
      },
    });

    return res.json({ status: true, message: "Created new student", student: newStudent });
    
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
};
