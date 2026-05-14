// import path from "path";
// import fs from "fs";
// import ErrorHandler from "./errorHandler.ts";
// import cloudinary from "cloudinary";

// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const saveFile = (file: any, filePath: string) => {
//   return new Promise<void>((resolve, reject) => {
//     file.mv(filePath, (err: Error) => {
//       if (err) return reject(err);
//       resolve();
//     });
//   });
// };
// export default saveFile;

// export const uploadToCloudinary = (
//   filePath: string,
//   folder: string,
//   options?: any
// ): Promise<{ public_id: string; url: string }> =>
//   new Promise<{ public_id: string; url: string }>((resolve, reject) => {
//     cloudinary.v2.uploader.upload(
//       filePath,
//       { folder, ...options },
//       (err, result) => {
//         if (err) {
//           console.error("Error during Cloudinary upload:", err);
//           return reject(err);
//         }
//         if (!result || !result.secure_url) {
//           console.error("Invalid response from Cloudinary:", result);
//           return reject(new Error("Invalid response from Cloudinary"));
//         }
//         resolve({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       }
//     );
//   });

// // Helper function to handle thumbnail upload
// export const handleThumbnailUpload = async (thumbnailFile: any) => {
//   if (thumbnailFile) {
//     const thumbnailPath = path.join(__dirname, "tmp", thumbnailFile.name);
//     await saveFile(thumbnailFile, thumbnailPath);
//     if (!fs.existsSync(thumbnailPath))
//       throw new ErrorHandler("Thumbnail file not found", 400);

//     const thumbnailResult = await uploadToCloudinary(thumbnailPath, "products");
//     return thumbnailResult;
//   }
// };

// export const deleteFromCloudinary = async (publicId: string) => {
//   try {
//     const result = await cloudinary.v2.uploader.destroy(publicId);
//     console.log("Deleted from Cloudinary:", result);
//   } catch (err) {
//     console.error("Error deleting image from Cloudinary:", err);
//   }
// };

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import ErrorHandler from "./errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmpDir = path.join(__dirname, "tmp");

// Save file function
const saveFile = (file: any, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    file.mv(filePath, (err: Error) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
export default saveFile;

// Upload to Cloudinary
export const uploadToCloudinary = (
  filePath: string,
  folder: string,
  options?: any
): Promise<{ public_id: string; url: string }> =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      { folder, ...options },
      (err, result) => {
        if (err) return reject(err);
        if (!result || !result.secure_url) {
          return reject(new Error("Invalid response from Cloudinary"));
        }
        resolve({ public_id: result.public_id, url: result.secure_url });
      }
    );
  });

// ✅ Main upload handler
export const handleThumbnailUpload = async (thumbnailFile: any) => {
  if (!thumbnailFile) return;

  try {
    // ✅ Ensure tmp directory exists
    await fs.promises.mkdir(tmpDir, { recursive: true });

    const thumbnailPath = path.join(tmpDir, thumbnailFile.name);

    // Save file to tmp directory
    await saveFile(thumbnailFile, thumbnailPath);

    // Check existence after save (optional)
    if (!fs.existsSync(thumbnailPath)) {
      throw new ErrorHandler("Thumbnail file not found", 400);
    }

    // Upload to Cloudinary
    const thumbnailResult = await uploadToCloudinary(thumbnailPath, "products");

    // ✅ Clean up: delete file
    await fs.promises.unlink(thumbnailPath);

    // ✅ Optionally delete tmp folder if empty
    const remainingFiles = await fs.promises.readdir(tmpDir);
    if (remainingFiles.length === 0) {
      await fs.promises.rmdir(tmpDir);
    }

    return thumbnailResult;
  } catch (err) {
    console.error("Error handling thumbnail upload:", err);
    throw err;
  }
};

// Optional: delete function
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
  }
};
