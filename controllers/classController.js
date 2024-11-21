const prisma = require("../db.config.js");

module.exports.getAllclass = async (req, res) => {
  try {
    const allclass = await prisma.class.findMany(
      {
        orderBy: {
          className: 'asc',
        },
      }
    );
    if (!allclass) {
      return res.json({ status: false, message: "No classs Found" });
    }

    return res.json({ status: true, data: allclass });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.getByIdclass = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "somthing wrong" });
    }

    const getByIdclass = await prisma.class.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.json({ status: true, data: getByIdclass });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.updateByIdclass = async (req, res) => {
  const { className, section } = req.body;
  // console.log("updateByIdclass=req.body=", req.body);
  // console.log("updateByIdclass=req.params=", req.params);

  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }

    const updateclass = await prisma.class.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        className,
        section,
      },
    });
    // console.log("updateclass==", updateclass);

    return res.json({
      status: true,
      message: "class successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: error, message: "server error" });
  }
};

module.exports.deleteByIdclass = async (req, res) => {
  // console.log("class ===", req.body);
  try {
    if (!req.params.id) {
      return res.json({ status: false, message: "Something wrong" });
    }
    const deleteclass = await prisma.class.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json({ status: true, message: "class delete successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

// Create class
module.exports.createclass = async (req, res) => {
  // console.log("createclass controller ", req.body);

  const { className, section, classTeacherId } = req.body;

  try {
    // check user entries
    // const exiextclass = await prisma.class.findFirst({
    //   where: {
    //     userId: Number(userId),
    //   },
    // });

    // if (exiextclass) {
    //   // Agar class already exist karta hai
    //   return res.json({
    //     status: false,
    //     message: "class already exists, please use another class",
    //   });
    // }

    const newclass = await prisma.class.create({
      data: {
        // classTeacherId: Number(classTeacherId),
        className,
        section,
      },
    });

    return res.json({
      status: true,
      message: "Created new class",
      class: newclass,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Server error" });
  }
};
