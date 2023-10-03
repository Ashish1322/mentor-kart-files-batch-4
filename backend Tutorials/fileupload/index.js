const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, "ABCD" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 } });

app.post("/upload-file", upload.single("resume"), function (req, res) {
  console.log(req.body);
  console.log(req.file);

  res.send("File Uplaoded");
});

app.listen(3002, () => console.log("Server is Running"));
