const constants = require('../constants');
// console.log('constants-->>', constants);
// multer file upload
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the directory exists
const designUploadDir = path.join(__dirname, "../media/design");
// console.log("📂designUploadDir📂", designUploadDir);

const userUploadDir = path.join(__dirname, "../media/user");
// console.log("📂userUploadDir📂", userUploadDir);

if (!fs.existsSync(designUploadDir)) {
  fs.mkdirSync(designUploadDir, { recursive: true });
}

if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
}
  
// Define custom storage settings
const storageDesign = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, designUploadDir); // Use the dynamically created path
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix+"."+file.originalname.split(".")[1]);
    // console.log("📂file📂");
    
  },
});

// Define custom storage settings
const storageUserMedia = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, userUploadDir); // Use the dynamically created path
    },
  
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix+"."+file.originalname.split(".")[1]);
    },
  });

  
// Create upload middleware for a single file
const designUploader = multer({ storage: storageDesign }).array("designFile",12);

// Create upload middleware for a single file
const userMediaUploader = multer({ storage: storageUserMedia }).single("profile");


const uploadMedia = (type) => { 
    switch (type) {
        case constants.mediaTypes.design: {
            return designUploader
        }
        break;  
        case constants.mediaTypes.userProfile:
            return userMediaUploader
        break;
        default:
            break;
    }
}

exports.uploadMedia = uploadMedia;