import { uploadToCloudinary } from "./cloudinary.js";

async function uploadMultipleFiles(files, fileName){
    const urls = [];
    const public_ids = [];

    for (const file of files) {
        const {path} = file;
        const data = await uploadToCloudinary(path, fileName);

        const {url, public_id} = data;
        
        urls.push(url);
        public_ids.push(public_id);
    }
    return {urls, public_ids}
}

export default uploadMultipleFiles;