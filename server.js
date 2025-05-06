const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

app.post("/upload-certificate", upload.single("certificateFile"), (req, res) => {
  try {
    const {
      certificateTitle,
      issuedTo,
      issuedBy,
      issueDate,
      proof,
      typeOfCertificate,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File upload failed or invalid file type." });
    }

    // You can now save all this data to a database if needed
    const uploadedData = {
      certificateTitle,
      issuedTo,
      issuedBy,
      issueDate,
      proof,
      typeOfCertificate,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    };

    res.status(200).json({ message: "Certificate uploaded successfully", data: uploadedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create uploads folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
