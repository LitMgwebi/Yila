//#region Imports
import log from "../config/logging.js";
import Background from "../Models/Background.js";
import {Router} from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import {uploadToCloudinary, removeFromCloudinary} from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL 
router.get('/', async(req, res) => {
    let background = null;

    try{
        background = await Background.find().sort({createdAt: "desc"}).exec();

        res.status(200).send({
            background: background,
            error: null,
            message: "Background pieces retrieved successfully";
        });
    }catch(error){
        log.error(error.message);
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Background pieces retrieval failed"
        });
    }
})
//#endregion

//#region GET ALL at id
router.get('/list', async(req, res) => {
    const id = req.query.creatorId
    let background = null;

    try{
        background = await Background.find({creator: id}).exec();

        res.status(200).send({
            background: background,
            error: null,
            message: "Background pieces retrieved successfully";
        });
    }catch(error){
        log.error(error.message);
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Background pieces retrieval failed"
        });
    }
})
//#endregion


//#endregion