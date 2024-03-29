//#region Imports and Router initialization
import {Router} from 'express';
import User from '../Models/User.js';
import jwt from "jsonwebtoken";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";
import log from '../config/logging.js';

const router = Router();
//#endregion

//#region GET ALL
router.get('/', async(req, res) => {
    let user = null;
    let message = "";

    try {
        user = await User.find().sort({ createdAt: "desc" }).exec();

        if (user.length > 0) {
            message = "Users retrieved successfully"
        } else {
            message = "There are no entries in the database"
        }

        res.status(200).send({
            user: user,
            error: null,
            message: message
        });
    } catch (error) {
        log.error(error.message);
        message = "Users retrieval failed";
        res.status(400).send({
            user: user,
            error: error.message,
            message: message
        });
    }
})
//#endregion

//#region GET 1
router.get('/:id', async(req, res) => {
    let user = null;

    try {
        user = await User.findById(req.params.id);

        res.status(200).send({
            user: user,
            error: null,
            message: "Users retrieved successfully"
        });
    } catch (error) {
        log.error(error.message);
        res.status(400).send({
            user: user,
            error: error.message,
            message: "Users retrieval failed"
        });
    }
})
//#endregion


//#region Login Route

router.post('/login', async(req, res)=> {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).send({email, token, message:"Logged in"});
    }catch(error){
        res.status(400).send({error: error.message});
    }
})
//#endregion

//#region Signup Route
router.post('/signup', upload.single("profilePhoto"), async(req, res)=> {
    const {email, password, firstName, lastName, DOB, profilePhoto} = req.body;
    
    const data = await uploadToCloudinary(req.file.path, "user");

    try{
        const profilePhoto = data.url;
        const public_id = data.public_id;

        const user = await User.signup(email, password, firstName, lastName, DOB, profilePhoto, public_id);
        const token = createToken(user._id);
        res.status(200).send({email, token, message:"Signed up"});
    }catch(error){
        await removeFromCloudinary(data.public_id);
        res.status(400).send({error: error.message});
    }
})
//#endregion

//#region Helper Functions
function createToken(_id){
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
//#endregion

export default router;