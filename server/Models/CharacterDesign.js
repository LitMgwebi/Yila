import {Schema, model} from "mongoose";

const characterDesignSchema = new Schema({
    nameOfCharacter: {
        type: String,
        required: [true, "Please enter the name of your character: "]
    },
    originalCharacter: {
        type: String,
        // required: [true, "Please enter the origin of the character: "]
    },
    public_id: {
        type: String,
    },
    creator: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const CharacterDesign = model('CharacterDesign', characterDesignSchema);

export default CharacterDesign;