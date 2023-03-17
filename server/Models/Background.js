import {Schema, model} from "mongoose";

const backgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the title of this piece: "]
    },
    piece: {
        type: String,
    },
    creator : {
        type: String,
        required: true,
    },
    public_id: {
        type: String
    }
}, { timestamps: true });

const Background = model('Background', backgroundSchema);

export default Background;