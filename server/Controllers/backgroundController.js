//#region Imports
import log from "../config/logging.js";
import Background from "../Models/Background.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL 
router.get('/', async (req, res) => {
    let background = null;

    try {
        background = await Background.find().sort({ createdAt: "desc" }).exec();

        res.status(200).send({
            background: background,
            error: null,
            message: "Background pieces retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Background pieces retrieval failed"
        });
    }
})
//#endregion

//#region GET ALL for consumer
router.get('/list', async (req, res) => {
    const creatorId = req.query.creatorId
    let background = null;

    try {
        background = await Background.find({ creator: creatorId }).sort({ createdAt: "desc" }).exec();

        res.status(200).send({
            background: background,
            error: null,
            message: "Background pieces retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Background pieces retrieval failed"
        });
    }
});
//#endregion

//#region GET ALL for user
router.get('/index', requireAuth, async (req, res) => {
    let background = null;
    const creator = req.user._id;

    try {
        background = await Background.find({ creator }).sort({ createdAt: "desc" }).exec();

        res.status(200).send({
            background: background,
            error: null,
            message: "Background pieces retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Background pieces retrieval failed"
        });
    }
});
//#endregion

//#region POST
router.post("/add", upload.single("piece"), requireAuth, async (req, res) => {
    let background = null;
    let data = null;
    try {
        data = await uploadToCloudinary(req.file.path, "background")

        background = new Background({
            title: req.body.title,
            piece: data.url,
            public_id: data.public_id,
            creator: req.user._id
        });

        await background.save();
        res.status(201).send({
            background: background,
            error: null,
            message: "New background piece was added successfully"
        });
    } catch (error) {
        log.error(err.message);
        await removeFromCloudinary(data.public_id)
        res.status(400).send({
            background: background,
            error: err.message,
            message: "Could not add new background piece"
        });
    }
});
//#endregion

//#region DELETE
router.delete('/:id', requireAuth, async (req, res) => {
    let background = null;

    try {
        background = await Background.findById(req.params.id);
        const publicId = background.public_id;
        await removeFromCloudinary(publicId)
        await background.remove();

        res.status(201).send({
            error: null,
            message: "Background piece deleted successfully",
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            background: background,
            error: error.message,
            message: "Could not delete background piece"
        });
    }
});
//#endregion

//#endregion

export default router;