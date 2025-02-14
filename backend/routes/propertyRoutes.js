// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createPropertyController } = require("../controllers/propertyController");

// Setup Multer for single-file upload under 'documents'
const upload = multer({ dest: "uploads/" });

// POST /api/property
router.post("/", upload.single("documents"), createPropertyController);

module.exports = router;
