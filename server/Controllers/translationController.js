//#region Imports
import log from "../config/logging.js";
import Translation from "../Models/Translation";
import { Router } from "express";
import requireAuth from "../Middleware/requireAuth.js";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
//#endregion

//#region Router
const router = Router();

//#region GET
router.get('/', async(req, res) => {
    const id = req.query.characterDesign
    let translation = null;
    
    try {
        translation = await Translation.find({ 
            characterDesign: id
        }).sort({ createdAt: "desc" }).exec();
        
        res.status(200).send({
            translation: translation,
            error: null,
            message: "Translations retrieved successfully"
        });
    }catch(error){
        log.error(error);
        res.status(404).send({
            translation: translation,
            error: error.message,
            message: "Translations retrival failed"
        });
    }
});
//#endregion

//#region POST
router.post('/add', upload.array("process"), async(req, res) => {
    let translation = null;
    let data;
    const process = [];
    const public_ids = [];

    try {
        const files = req.files;
        for (const file of files) {
            const {path} = file;
            data = await uploadToCloudinary(path, "translation");

            const {url, public_id} = data;
            process.push(url);
            public_ids.push(public_id);
        }

        translation = new Translation({
            article: req.body.article,
            characterDesign: req.body.characterDesign,
            process: process,
            public_ids: public_ids,
            creator: req.user._id
        });

        await translation.save();

        res.status(201).send({
            translation: translation,
            error: null,
            message: "New translation was added successfully"
        });
    }catch(error){
        for(let i = 0; i < public_ids.length; i++){
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
router.delete("/:id", requireAuth, async function(req, res) {
    let translation = null;
    try{
        translation = await Translation.findById(req.params.id);
        for(let i = 0; i < translation.public_ids.length; i++){
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