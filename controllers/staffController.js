const prisma = require("../db.config.js");

module.exports.getAllStaff = async (req, res) => {
  try {
    const allStaff = await prisma.staff.findMany();
    if (!allStaff) {
      return res.json({ status: false, message: "No Staffs Found" });
    }

    return res.json({ status: true, data: allStaff });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdStaff = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }

    const getByIdStaff = await prisma.staff.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.json({ status: true, data: getByIdStaff });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdStaff = async (req, res) => {
  const { staffNumber, dob, gender, role, salary } = req.body;
  console.log("updateByIdStaff=req.body=", req.body);
  console.log("updateByIdStaff=req.params=", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    const updateStaff = await prisma.staff.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        dob: new Date(dob),
        gender: gender,
        role,
        salary: Number(salary),
      },
    });
    console.log("updateStaff==", updateStaff);

    return res.json({
      status: true,
      message: "Staff successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.deleteByIdStaff = async (req, res) => {
  console.log("Staff ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteStaff = await prisma.staff.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "Staff delete successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

// Create Staff
module.exports.createStaff = async (req, res) => {
  console.log("createStaff controller ", req.body);

  const { staffNumber, dob, gender, role, salary, userId, enrollmentDate } = req.body;

  const [day, month, year] = dob.split('/');
const formattedDOB = new Date(`${year}-${month}-${day}`);

  try {
    // check user entries
    const exiextStaff = await prisma.staff.findFirst({
      where: {
        staffNumber: staffNumber,
      },
    });

    // console.log("exiextStaff==", exiextStaff);

    if (exiextStaff) {
      // Agar Staff already exist karta hai
      return res.json({
        status: false,
        message: "Staff already exists, please use another staff number.",
      });
    }

    const newStaff = await prisma.staff.create({
      data: {
        // userId: Number(userId),
        staffNumber,
        dob: formattedDOB,
        gender,
        role,
        salary: Number(salary),
      },
    });

    return res.json({
      status: true,
      message: "Created new Staff",
      Staff: newStaff,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
};
