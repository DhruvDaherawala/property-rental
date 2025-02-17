// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const mysql = require("mysql2");

// Configure Multer (file uploads to /uploads)
const upload = multer({ dest: "uploads/" });

// Create a MySQL connection (adjust credentials)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // XAMPP default
  password: "",       // XAMPP default (empty if not set)
  database: "test_db", // Your DB name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL (Property).");
});

/**
 * GET /api/property
 * Fetch all properties from the DB
 */
router.get("/", (req, res) => {
  const query = "SELECT * FROM properties";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ error: "Failed to fetch properties" });
    }
    return res.json(results);
  });
});

/**
 * POST /api/property
 * Create a new property with child/floor details
 */
router.post("/", upload.single("documents"), (req, res) => {
  try {
    // The JSON data from formData
    const { formData } = req.body;
    const parsedData = JSON.parse(formData);

    const { propertyName, ownerName, address, childProperties } = parsedData;

    // If a file was uploaded, store the filename/path
    let documentsPath = null;
    if (req.file) {
      documentsPath = req.file.filename;
    }

    // Insert into 'properties' table
    const insertPropertyQuery = `
      INSERT INTO properties (propertyName, ownerName, address, documents)
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      insertPropertyQuery,
      [propertyName, ownerName, address, documentsPath],
      (err, result) => {
        if (err) {
          console.error("Error inserting property:", err);
          return res.status(500).json({ error: "Failed to save property" });
        }

        const newPropertyId = result.insertId;

        // If there are childProperties, insert each
        if (Array.isArray(childProperties) && childProperties.length > 0) {
          const insertChildQuery = `
            INSERT INTO child_properties
              (property_id, floor, title, description, rooms, washroom, gas, electricity, deposit, rent)
            VALUES ?
          `;

          // Build values array for bulk insert
          const childValues = childProperties.map((child) => [
            newPropertyId,
            child.floor,
            child.title,
            child.description,
            child.rooms,
            child.washroom,
            child.gas,
            child.electricity,
            child.deposit,
            child.rent,
          ]);

          db.query(insertChildQuery, [childValues], (childErr) => {
            if (childErr) {
              console.error("Error inserting child properties:", childErr);
              return res
                .status(500)
                .json({ error: "Failed to save child properties" });
            }

            return res
              .status(201)
              .json({ message: "Property created with floors successfully" });
          });
        } else {
          return res
            .status(201)
            .json({ message: "Property created (no floors)" });
        }
      }
    );
  } catch (error) {
    console.error("Error saving property:", error);
    return res.status(500).json({ error: "Failed to save property" });
  }
});

module.exports = router;
