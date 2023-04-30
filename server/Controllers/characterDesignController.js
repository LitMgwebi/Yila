//#region Imports
import log from "../config/logging.js";
import CharacterDesign from "../Models/CharacterDesign.js";
import Translation from "../Models/Translation.js";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET ALL
router.get('/', async (req, res) => {
    let cd = null;
    let message = "";

    try{
        cd = await CharacterDesign.find({}).sort({ createdAt: "desc" }).exec();

        if (cd.length > 0) {
            message = "Character design retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        res.status(200).send({
            characterDesign: cd,
            error: null,
            message: message
        });
    }catch(error){
        log.error(error);
        message = "Character designs retrival failed"
        res.status(404).send({
            characterDesign: cd,
            error: error.message,
            message: message
        });
    }
});
//#endregion

//#region GET ALL for consumer
router.get('/list', async (req, res) => {
    let cd = null;
    let message = "";
    const creator = req.query.creatorId

    try{
        cd = await CharacterDesign.find({ creator }).sort({ createdAt: "desc" }).exec();

        if (cd.length > 0) {
            message = "Character design retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        res.status(200).send({
            characterDesign: cd,
            error: null,
            message: message
        });
    }catch(error){
        log.error(error);
        message = "Character designs retrival failed"
        res.status(404).send({
            characterDesign: cd,
            error: error.message,
            message: message
        });
    }
});
//#endregion

//#region GET ALL for user
router.get('/index', requireAuth, async (req, res) => {
    let cd = null;
    const creator = req.user._id;
    let message = "";

    try{
        cd = await CharacterDesign.find({ creator }).sort({ createdAt: "desc" }).exec();

        if (cd.length > 0) {
            message = "Character design retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        res.status(200).send({
            characterDesign: cd,
            error: null,
            message: message
        });
    }catch(error){
        log.error(error);
        message = "Character designs retrival failed";
        res.status(404).send({
            characterDesign: cd,
            error: error.message,
            message: message
        });
    }
});
//#endregion

//#region GET one
router.get('/:id', async (req, res) => {
    let cd = null;

    try {
        cd = await CharacterDesign.findById(req.params.id);

        res.status(201).send({
            characterDesign: cd,
            error: null,
            message: "Character design retrieval successful"
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            characterDesign: cd,
            error: error.message,
            message: "Character design retrieval failed"
        });
    }
});
//#endregion

//#region POST
router.post('/add', upload.single('originalCharacter'), requireAuth, async (req, res) => {
    let cd = null;
    let data = null;
    try {
        data = await uploadToCloudinary(req.file.path, "characterDesign")

        cd = new CharacterDesign({
            nameOfCharacter: req.body.nameOfCharacter,
            originalCharacter: data.url,
            public_id: data.public_id,
            creator: req.user._id
        });
        await cd.save();
        res.status(201).send({
            characterDesign: cd,
            error: null,
            message: "New character design was successfully added"
        });
    } catch (error) {
        log.error(error);
        await removeFromCloudinary(data.public_id)
        res.status(400).send({
            characterDesign: cd,
            error: error.message,
            message: "Could not add new character design"
        });
    }
})

//#endregion

//#region DELETE
router.delete('/:id', requireAuth, async (req, res) => {
    let cd = null
    try {
        cd = await CharacterDesign.findById(req.params.id);

        deleteTranslation(req.params.id)

        const publicId = cd.public_id;
        await removeFromCloudinary(publicId);
        await cd.remove();

        res.status(201).send({
            error: null,
            message: "Character design deleted successfully",
        });
    } catch (error) {
        log.error(error.message)
        res.status(400).send({
            characterDesign: cd,
            error: error.message,
            message: "Could not delete character design"
        });
    }
});
//#endregion

//#endregion

//#region Helper Functions
async function deleteTranslation(id){
    
    for await (const doc of Translation.find({ characterDesign: id })) {
        try{
            for(let i = 0; i < doc.public_ids.length; i++){
                const publicId = doc.public_ids[i];
                await removeFromCloudinary(publicId);
            }

            await doc.remove();
        }catch(error){
            log.error(error);
        }
    }
}
//#endregion

export default router;