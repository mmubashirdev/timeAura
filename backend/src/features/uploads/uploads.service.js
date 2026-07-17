// backend/src/features/uploads/uploads.service.js
const fs = require("fs");
const path = require("path");

let cloudinary;
try {
  // Dynamically load cloudinary if it is installed
  cloudinary = require("cloudinary").v2;
  
  // Configure Cloudinary with provided credentials
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "gvs4shf7",
    api_key: process.env.CLOUDINARY_API_KEY || "131149352195797",
    api_secret: process.env.CLOUDINARY_API_SECRET || "71ASvUPTQmxx5YRnoKspCbJT3Nw",
  });
} catch (e) {
  console.warn("Cloudinary package not loaded, using local storage fallback.");
}

class UploadsService {
  constructor() {
    this.localUploadDir = path.join(__dirname, "../../../public/uploads");
    if (!fs.existsSync(this.localUploadDir)) {
      fs.mkdirSync(this.localUploadDir, { recursive: true });
    }
  }

  async uploadSingle(file) {
    if (!file) throw new Error("No file uploaded");

    // Use Cloudinary if available
    if (cloudinary) {
      try {
        // Upload to Cloudinary using file buffer
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "timeaura" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        return result.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed, falling back to local storage:", err);
      }
    }

    // Local Storage Fallback
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    const filePath = path.join(this.localUploadDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);
    return `/uploads/${filename}`;
  }

  async uploadMultiple(files) {
    if (!files || !files.length) return [];
    const urls = await Promise.all(files.map((file) => this.uploadSingle(file)));
    return urls;
  }
}

module.exports = new UploadsService();
