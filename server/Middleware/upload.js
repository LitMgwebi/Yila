import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/gif', 'video/mp3', 'video/mkv', 'video/avi'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage: storage, fileFilter });

export default upload;