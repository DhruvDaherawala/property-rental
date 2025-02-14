// // routes/renterRoutes.js
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { createRenterController } = require("../controllers/renterController");

// // Setup Multer for multiple-file uploads
// const upload = multer({ dest: "uploads/" });

// /**
//  * Fields from the form:
//  *  - aadhaarCard
//  *  - panCard
//  *  - passportPhoto
//  *  - otherDocument
//  */
// const cpUpload = upload.fields([
//   { name: "aadhaarCard", maxCount: 1 },
//   { name: "panCard", maxCount: 1 },
//   { name: "passportPhoto", maxCount: 1 },
//   { name: "otherDocument", maxCount: 1 },
// ]);

// // POST /api/renter
// router.post("/", cpUpload, createRenterController);

// module.exports = router;

// routes/renterRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createRenterController } = require("../controllers/renterController");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // all files go to /uploads
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp-originalName
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// For multiple file fields
const cpUpload = upload.fields([
  { name: "aadhaarCard", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 },
  { name: "otherDocument", maxCount: 1 },
]);

// POST /api/rental
router.post("/", cpUpload, createRenterController);

module.exports = router;
