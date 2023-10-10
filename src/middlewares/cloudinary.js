import { v2 as cloudinary } from "cloudinary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/**
 * upload files to the cloud
 * @param {String} folder - folder name in cloudinary
 * @param {String} file - path to file to upload
 * @returns {Object} {success, code, data, error}
 */
const uploadFile = async (file, folder) => {
  try {
    const {
      public_id,
      format,
      resource_type,
      created_at,
      bytes,
      type,
      url,
      secure_url,
    } = await cloudinary.uploader.upload(file, {
      use_filename: true,
      resource_type: "auto",
      folder,
    });

    console.log(public_id, resource_type, url);
    if (public_id) {
      fs.unlinkSync(file);
    }
    return {
      success: true,
      code: 200,
      data: {
        public_id,
        format,
        resource_type,
        created_at,
        bytes,
        type,
        url,
        secure_url,
        folder,
      },
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      error,
      stack: error.stack,
    };
  }
};

/**
 * remove file from cloudinary
 * @param  {...any} public_ids
 * @param {String} rtype - resource type
 * @returns {Object} - {success, code, data, error}
 */

const removeFile = async (rtype = "auto", ...public_ids) => {
  try {
    const result = await cloudinary.api.delete_resources(public_ids, {
      type: "upload",
      resource_type: rtype,
    });

    console.log(result);
    return {
      success: true,
      code: 200,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      error,
      stack: error.stack,
    };
  }
};

export { removeFile, uploadFile };
