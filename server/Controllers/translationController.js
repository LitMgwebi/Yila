//#region Imports
import log from "../config/logging.js";
import Translation from "../Models/Translation.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { removeFromCloudinary } from "../Services/cloudinary.js";
import uploadMultipleFiles from "../Services/uploadMultipleFiles.js";
//#endregion

//#region Router
const router = Router();

//#region GET
router.get('/', async (req, res) => {
    const id = req.query.characterDesign
    let translation = null;
    let message = "";

    try {
        translation = await Translation.find({
            characterDesign: id
        }).sort({ createdAt: "desc" }).exec();

        if (translation.length > 0) {
            message = "Translations retrieved successfully";
        } else {
            message = "There are no entries in the database";
        }

        res.status(200).send({
            translation: translation,
            error: null,
            message: message
        });
    } catch (error) {
        log.error(error);
        message = "Translations retrival failed";
        res.status(404).send({
            translation: translation,
            error: error.message,
            message: message
        });
    }
});
//#endregion

//#region POST
router.post('/add', upload.array("process"), requireAuth, async (req, res) => {
    let translation = null;
    const files = req.files;
    const { urls, public_ids } = await uploadMultipleFiles(files, "translation");

    try {
        translation = new Translation({
            article: req.body.article,
            characterDesign: req.body.characterDesign,
            process: urls,
            public_ids: public_ids,
            creator: req.user._id
        });

        await translation.save();

        res.status(201).send({
            translation: translation,
            error: null,
            message: "New translation was added successfully"
        });
    } catch (error) {
        for (let i = 0; i < public_ids.length; i++) {
            const publicId = public_ids[i];
            await removeFromCloudinary(publicId);
        }
        log.error(error);
        res.status(400).send({
            translation: translation,
            error: error.message,
            message: "Could not add new translation"
        });
    }
});
//#endregion

//#region DELETE
router.delete("/:id", requireAuth, async function (req, res) {
    let translation = null;
    try {
        translation = await Translation.findById(req.params.id);
        for (let i = 0; i < translation.public_ids.length; i++) {
            const publicId = translation.public_ids[i];
            await removeFromCloudinary(publicId);
        }

        await translation.remove();

        res.status(201).send({
            error: null,
            message: "Translation deleted successfully",
        })
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            translation: translation,
            error: error.message,
            message: "Could not delete translation"
        });
    }
})
//#endregion

//#endregion

export default router;