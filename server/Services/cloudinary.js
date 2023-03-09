import log from "../config/logging.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (path, folder) => {
    return cloudinary.uploader
        .upload(path, {
            folder: folder,
        })
        .then((data) => {
            return { url: data.url, public_id: data.public_id };
        }).catch((error) => {
            log.error(error);
        });
}

const uploadVideo = (path, folder) => {
    return cloudinary.uploader
        .upload(path, {
            folder: folder,
            resource_type: "video",
        })
        .then((data) => {
            return { url: data.url, public_id: data.public_id };
        }).catch((error) => {
            log.error(error);
        });
}

const removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
        console.log(result, error);
    });
}

export { uploadToCloudinary, removeFromCloudinary, uploadVideo };