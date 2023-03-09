//#region Imports
import log from "../config/logging.js";
import Animation from "../Models/Animation.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { removeFromCloudinary, uploadToCloudinary, uploadVideo } from "../Services/cloudinary.js";
import uploadMultipleFiles from "../Services/uploadMultipleFiles.js";
//#endregion

//#region Router
const router = Router();

//#region GET All 
router.get('/', async (req, res) => {
    let animation = null;

    try {
        animation = await Animation.find().sort({ createdAt: 'desc' }).exec();

        res.status(200).send({
            animation: animation,
            error: null,
            message: "Animations retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            animation: animation,
            error: error.message,
            message: "Animations retrieval failed"
        });
    }
});
//#endregion

//#region GET All for consumer
router.get('/list', async (req, res) => {
    let animation = null;
    const creatorId = req.query.creatorId;

    try {
        animation = await Animation.find({ creator: creatorId }).sort({ createdAt: 'desc' }).exec();

        res.status(200).send({
            animation: animation,
            error: null,
            message: "Animations retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            animation: animation,
            error: error.message,
            message: "Animations retrieval failed"
        });
    }
});
//#endregion

//#region GET All 
router.get('/index', requireAuth, async (req, res) => {
    let animation = null;
    const creator = req.user._id;

    try {
        animation = await Animation.find({ creator }).sort({ createdAt: 'desc' }).exec();

        res.status(200).send({
            animation: animation,
            error: null,
            message: "Animations retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            animation: animation,
            error: error.message,
            message: "Animations retrieval failed"
        });
    }
});
//#endregion

//#region GET 1
router.get("/:id", async (req, res) => {
    let animation = null;;

    try {
        animation = await Animation.findById(req.params.id);

        res.status(201).send({
            animation: animation,
            error: null,
            message: "Animation retrieval successful"
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            animation: animation,
            error: error.message,
            message: "Animation retrieval failed"
        });
    }
});
//#endregion

//#region POST
router.post("/add", upload.fields([
    { name: 'movements' },
    { name: 'backgrounds' },
    { name: 'effects' },
    { name: 'preview' }
]), async (req, res) => {
    let animation = null;
    const movementFiles = req.files["movements"];
    const effectFiles = req.files["effects"];
    const backgroundFiles = req.files["backgrounds"];
    const previewFile = req.files["preview"];

    const previewData = await uploadVideo(previewFile[0].path, "preview");
    const { urls: movements, public_ids: movements_public_ids } = await uploadMultipleFiles(movementFiles, "movements");
    const { urls: effects, public_ids: effects_public_ids } = await uploadMultipleFiles(effectFiles, "effects");
    const { urls: backgrounds, public_ids: backgrounds_public_ids } = await uploadMultipleFiles(backgroundFiles, "backgrounds");

    try {
        animation = new Animation({
            title: req.body.title,
            article: req.body.article,
            preview: previewData.url,
            preview_public_id: previewData.public_id,
            movements: movements,
            movements_public_ids: movements_public_ids,
            backgrounds: backgrounds,
            backgrounds_public_ids: backgrounds_public_ids,
            effects: effects,
            effects_public_ids: effects_public_ids,
            // creator: req.user._id
        });

        
        await animation.save();

        res.status(201).send({
            animation: animation,
            error: null,
            message: "New animation was added successfully",
        });
    } catch (error) {
        await removeFromCloudinary(previewData.public_id);
        await deletePublicIds(movements_public_ids);
        await deletePublicIds(backgrounds_public_ids);
        await deletePublicIds(effects_public_ids);

        log.error(error);
        res.status(400).send({
            animation: animation,
            error: error.message,
            message: "Could not add new animation"
        });
    }
});
//#endregion

//#region DELETE
router.delete("/:id",  async function (req, res) {
    let animation = null;
    try {
        animation = await Animation.findById(req.params.id);

        await removeFromCloudinary(animation.preview_public_id);
        await deletePublicIds(animation.movements_public_ids);
        await deletePublicIds(animation.backgrounds_public_ids);
        await deletePublicIds(animation.effects_public_ids);

        await animation.remove();

        res.status(201).send({
            error: null,
            message: "Amimation deleted successfully",
        });
    } catch (error) {
        log.error(error);
        res.status(404).send({
            animation: animation,
            error: error.message,
            message: "Could not delete animation"
        });
    }
});
//#endregion

//#endregion

//#region Helper Functions
async function deletePublicIds(public_ids) {
    for (let i = 0; i < public_ids.length; i++) {
        const public_id = public_ids[i];
        await removeFromCloudinary(public_id);
    }
}
//#endregion

export default router