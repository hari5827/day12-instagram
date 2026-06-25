const postmodel = require("../models/post.model");
const ImageKit = require("imagekit"); // Standard import

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function createPostControl(req, res) {
    try {
        // Log req.file (not res.file) to see the buffer and metadata
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const file = await imagekit.upload({
            file: req.file.buffer, // Use the buffer directly from multer
            fileName: req.file.originalname || "test_image", // Use the real filename
            folder: "/posts" // Optional: organize your uploads
        });

        res.status(200).send(file);
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).send(error.message);
    }
}

module.exports = { createPostControl };