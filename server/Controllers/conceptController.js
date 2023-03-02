//#region Imports
import log from "../config/logging.js";
import Concept from "../Models/Concept.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL
router.get("/", async (req, res) => {
    let concept = null;

    try {
        concept = await Concept.find({}).sort({ createdAt: "desc" }).exec();
        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept retrieval failed"
        });
    }
});
//#endregion

//#region GET ALL for consumer
router.get("/list", async (req, res) => {
    let concept = null;
    const creatorId = req.query.creatorId;

    try {
        concept = await Concept.find({ creator: creatorId }).sort({ createdAt: "desc" }).exec();
        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept retrieval failed"
        });
    }
});
//#endregion

//#region GET ALL for user
router.get("/index", requireAuth, async (req, res) => {
    let concept = null;
    const creator = req.user._id;

    try {
        concept = await Concept.find({ creator }).sort({ createdAt: "desc" }).exec();
        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept retrieval failed"
        });
    }
});
//#endregion

//#region GET 1
router.get("/:id", async (req, res) => {
    let concept = null;
    try {
        concept = await Concept.findById(req.params.id);

        res.status(201).send({
            concept: concept,
            error: null,
            message: "Concept piece retrieval successful"
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Concept piece retrieval failed"
        });
    }
})
//#endregion

//#region POST
router.post('/add', upload.array("pieces"), async (req, res) => {
    let concept = null;
    let data;
    const photos = []
    const public_ids = []
    try {
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            data = await uploadToCloudinary(path, "concept");

            const { url, public_id } = data;
            photos.push(url);
            public_ids.push(public_id);
        }

        concept = new Concept({
            title: req.body.title,
            article: req.body.article,
            pieces: photos,
            public_ids: public_ids,
            // creator: req.user._id
        });

        await concept.save();
        res.status(201).send({
            concept: concept,
            error: null,
            message: "New concept piece was successfully added"
        });
    } catch (error) {
        log.error(error);

        for (let i = 0; i < public_ids.length; i++) {
            const publicId = public_ids[i];
            await removeFromCloudinary(publicId);
        }

        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Could not add new concept piece"
        });
    }
});
//#endregion

//#region DELETE /fine-art/:id
router.delete('/:id', async (req, res) => {
    let concept = null
    try {
        concept = await Concept.findById(req.params.id);
        for (let i = 0; i < concept.public_ids.length; i++) {
            const publicId = concept.public_ids[i];
            await removeFromCloudinary(publicId);
        }

        await concept.remove();
        res.status(201).send({
            error: null,
            message: "Concept piece deleted successfully",
        })
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            concept: concept,
            error: error.message,
            message: "Could not delete concept piece"
        });
    }
});
//#endregion

//#endregion

export default router;