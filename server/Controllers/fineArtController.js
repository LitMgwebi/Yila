//#region Imports
import log from "../config/logging.js";
import FineArt from "../Models/FineArt.js";
import {Router} from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import {uploadToCloudinary, removeFromCloudinary} from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL
router.get("/", async (req, res) => {
    let fineArt = null;

    try {
        const landscape = await FineArt.find({physicalType: 'Landscape'}).sort({createdAt: "desc"}).exec();
        const portrait = await FineArt.find({physicalType: 'Portrait'}).sort({createdAt: "desc"}).exec();
        const other = await FineArt.find({physicalType: 'Other'}).sort({createdAt: "desc"}).exec();

        fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: "Fine Art retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Fine Art retrieval failed"
        })
    }
});
//#endregion

//#region GET ALL for consumer
router.get('/list', async(req, res) => {
    let fineArt = null;
    const creatorId = req.query.creatorId;

    try {
        const landscape = await FineArt.find({creator: creatorId, physicalType: 'Landscape'}).exec();
        const portrait = await FineArt.find({creator: creatorId, physicalType: 'Portrait'}).exec();
        const other = await FineArt.find({creator: creatorId, physicalType: 'Other'}).exec();

        fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: "Fine Art retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Fine Art retrieval failed"
        })
    }
});
//#endregion

//#region GET ALL for user
router.get('/index', requireAuth, async (req, res) => {
    let fineArt = null;
    const creator = req.user._id;

    try {
        const landscape = await FineArt.find({creator, physicalType: 'Landscape'}).exec();
        const portrait = await FineArt.find({creator, physicalType: 'Portrait'}).exec();
        const other = await FineArt.find({creator, physicalType: 'Other'}).exec();

        fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: "Fine Art retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Fine Art retrieval failed"
        })
    }
});
//#endregion

//#region POST
router.post('/add', upload.single('piece'), async (req, res) => {
    let fineArt = null;
    try {
        const data = await uploadToCloudinary(req.file.path, "fine")

        fineArt = new FineArt({
            title: req.body.title,
            physicalType: req.body.physicalType,
            article: req.body.article,
            dimension: req.body.dimension,
            piece: data.url,
            public_id: data.public_id,
            // creator: req.user._id
        });
        await fineArt.save();
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: "New fine art piece was added successfully"
        });
    } catch (error) {
        log.error(error);
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Could not add new fine art piece"
        });
    }
})
//#endregion

//#region DELETE
router.delete('/:id', async (req, res) => {
    let fineArt = null
    try {
        fineArt = await FineArt.findById(req.params.id);
        const publicId = fineArt.public_id;
        await removeFromCloudinary(publicId);
        await fineArt.remove();

        res.status(201).send({
            error: null,
            message: "Fine art piece deleted successfully",
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Could not delete fine art piece"
        });
    }
});
//#endregion

//#endregion