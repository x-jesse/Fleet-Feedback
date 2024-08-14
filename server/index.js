const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const gridfsStream = require("gridfs-stream");

const authRoutes = require("./routes/auth.js");
const tripRoutes = require("./routes/trips.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
const ObjectId = mongoose.Types.ObjectId;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected."))

const connection = mongoose.connection;

let gfs;
connection.once("open", () => {
    gfs = gridfsStream(connection.db, mongoose.mongo);
    gfs.collection("uploads"); // Choose a collection name for your GridFS files
});

const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            filename: "test_file",
            bucketName: "uploads", // The name of the collection you want to store the files in
        };
    },
});

const upload = multer({
    storage
});

app.post("/api/trips/incidents/upload", upload.single("video"), (req, res) => {
    try {
        // The file metadata is stored in req.file
        if (!req.file) {
            return res.status(400).send({
                message: "No file uploaded"
            });
        }

        // Send a response with the file details
        res.status(201).send({
            message: "File uploaded successfully",
            fileId: req.file.id, // The ObjectId of the stored file
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

app.get("/api/trips/incidents/videos/:id", async (req, res) => {
    const fileId = req.params.id;
    console.log("req received");
    try {
        let files = await gfs.files.findOne({
            filename: fileId
        });
        console.log('found')
        res.json({
            files
        });
    } catch (err) {
        res.json({
            err
        });
    }
    return;
    await gfs.files.findOne({
        filename: "test_file"
    }, (file) => {
        if (!file || file.length === 0) {
            console.log("fileno");
            return res.status(404).json({
                message: "File not found"
            });
        }
        console.log("found");

        // Set the response headers
        res.set("Content-Type", file.contentType);
        res.set("Content-Length", file.length);

        // Create a read stream from GridFS
        const readstream = gfs.createReadStream({
            filename: "test_file"
        });

        // Pipe the read stream to the response
        readstream.pipe(res);
    });
});

app.get("/", (req, res) => {
    res.send("this is home");
});

app.get("/api/get-maps-api", (req, res) => {
    res.status(200).json({
        apiKey: process.env.MAPS_API
    });
});

app.get("/api/get-genai-api", (req, res) => {
    res.status(200).json({
        apiKey: process.env.GEN_AI
    });
})

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});