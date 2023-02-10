//#region Imports and Router initialization
import {Router} from 'express';
import User from '../Models/User.js';
import jwt from "jsonwebtoken";
import upload from "../Middleware/upload.js";
import { uploadToCloudinary, removeFromCloudinary } from "../Services/cloudinary.js";

const router = Router();
//#endregion

//#region GET ALL
router.get('/', async(req, res) => {
    let user = null;

    try {
        user = await User.find().sort({ createdAt: "desc" }).exec();

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
    const {email, password, firstName, lastName, DOB} = req.body;

    try{
        const data = await uploadToCloudinary(req.file.path, "user");

        const profilePhoto = data.url;
        const public_id = data.public_id;

        const user = await User.signup(email, password, firstName, lastName, DOB, profilePhoto, public_id);
        const token = createToken(user._id);
        res.status(200).send({email, token, message:"Signed up"});
    }catch(error){
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