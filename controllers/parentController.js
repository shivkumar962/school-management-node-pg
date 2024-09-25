const prisma = require("../db.config.js");

module.exports.getAllParent = async (req, res) => {
  try {
    const allParent = await prisma.parent.findMany();
    if (!allParent) {
      return res.json({ status: false, message: "No Parents Found" });
    }

    return res.json({ status: true, data: allParent });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdParent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }

    const getByIdParent = await prisma.parent.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.json({ status: true, data: getByIdParent });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdParent = async (req, res) => {
  const { occupation, relationshipToStudent } = req.body;
  console.log("updateByIdParent=req.body=", req.body);
  console.log("updateByIdParent=req.params=", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    const updateParent = await prisma.parent.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        occupation,
        relationshipToStudent,
      },
    });
    console.log("updateParent==", updateParent);

    return res.json({
      status: true,
      message: "Parent successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.deleteByIdParent = async (req, res) => {
  console.log("Parent ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteParent = await prisma.parent.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "Parent delete successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

// Create Parent
module.exports.createParent = async (req, res) => {
  console.log("createParent controller ", req.body);

  const { occupation, relationshipToStudent,userId } = req.body;

  try {
    // check user entries
    const exiextParent = await prisma.parent.findFirst({
      where: {
        userId: userId,
      },
    });

    // console.log("exiextParent==", exiextParent);

    if (exiextParent) {
      // Agar Parent already exist hai
      return res.json({
        status: false,
        message: "Parent already exists",
      });
    }

    const newParent = await prisma.parent.create({
      data: {
        userId: Number(userId),
        occupation,
        relationshipToStudent   
      },
    });

    return res.json({
      status: true,
      message: "Created new Parent",
      Parent: newParent,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
};
