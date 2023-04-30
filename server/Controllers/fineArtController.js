//#region Imports
import log from "../config/logging.js";
import FineArt from "../Models/FineArt.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL
router.get("/", async (req, res) => {
    let landscape = null;
    let portrait = null;
    let other = null;
    let message = "";

    try {
        landscape = await FineArt.find({ physicalType: 'Landscape' }).sort({ createdAt: "desc" }).exec();
        portrait = await FineArt.find({ physicalType: 'Portrait' }).sort({ createdAt: "desc" }).exec();
        other = await FineArt.find({ physicalType: 'Other' }).sort({ createdAt: "desc" }).exec();

        /*fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }*/

        if (landscape.length > 0 || portrait.length > 0 || other.length > 0) {
            message = "Fine Art retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        res.status(201).send({
            landscape: landscape,
            other: other,
            portrait: portrait,
            error: null,
            message: message
        });
    } catch (error) {
        log.error(error.message);
        message = "Fine Art retrieval failed";
        res.status(400).send({
            landscape: landscape,
            other: other,
            portrait: portrait,
            error: error.message,
            message: message
        })
    }
});
//#endregion

//#region GET ALL for consumer
router.get('/list', async (req, res) => {
    let landscape = null;
    let portrait = null;
    let other = null;
    const creator = req.query.creatorId;
    let message = "";

    try {
        landscape = await FineArt.find({ creator, physicalType: 'Landscape' }).sort({ createdAt: "desc" }).exec();
        portrait = await FineArt.find({ creator, physicalType: 'Portrait' }).sort({ createdAt: "desc" }).exec();
        other = await FineArt.find({ creator, physicalType: 'Other' }).sort({ createdAt: "desc" }).exec();

        /*fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }*/

        if (landscape.length > 0 || portrait.length > 0 || other.length > 0) {
            message = "Fine Art retrieved successfully";
        } else {
            message = "There are no entries in the database";
        }

        res.status(201).send({
            landscape: landscape,
            other: other,
            portrait: portrait,
            error: null,
            message: message
        });
    } catch (error) {
        log.error(error.message);
        message = "Fine Art retrieval failed"
        res.status(400).send({
            landscape: landscape,
            other: other,
            portrait: portrait,
            error: error.message,
            message: message
        })
    }
});
//#endregion

//#region GET ALL for user
router.get('/index', requireAuth, async (req, res) => {
    let fineArt = null;
    const creator = req.user._id;
    let message = ""

    try {
        const landscape = await FineArt.find({ creator, physicalType: 'Landscape' }).sort({ createdAt: "desc" }).exec();
        const portrait = await FineArt.find({ creator, physicalType: 'Portrait' }).sort({ createdAt: "desc" }).exec();
        const other = await FineArt.find({ creator, physicalType: 'Other' }).sort({ createdAt: "desc" }).exec();

        if (landscape.length > 0 || portrait.length > 0 || other.length > 0) {
            message = "Fine Art retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        fineArt = {
            landscape: landscape,
            portrait: portrait,
            other: other
        }
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: message
        });
    } catch (error) {
        log.error(error.message);
        message = "Fine Art retrieval failed";
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: message
        })
    }
});
//#endregion

//#region POST
router.post('/add', upload.single('piece'), requireAuth, async (req, res) => {
    let fineArt = null;
    let data = null;
    try {
        data = await uploadToCloudinary(req.file.path, "fine")

        fineArt = new FineArt({
            title: req.body.title,
            physicalType: req.body.physicalType,
            article: req.body.article,
            dimension: req.body.dimension,
            piece: data.url,
            public_id: data.public_id,
            creator: req.user._id
        });
        await fineArt.save();
        res.status(201).send({
            fineArt: fineArt,
            error: null,
            message: "New fine art piece was added successfully"
        });
    } catch (error) {
        log.error(error);
        await removeFromCloudinary(data.public_id);
        res.status(400).send({
            fineArt: fineArt,
            error: error.message,
            message: "Could not add new fine art piece"
        });
    }
})
//#endregion

//#region DELETE
router.delete('/:id', requireAuth, async (req, res) => {
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

export default router;