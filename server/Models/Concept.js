import {Schema, model} from "mongoose";

const conceptSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the title of your piece: "]
    },
    article: {
        type: String
    },
    pieces: {
        type: Array,
    },
    creator: {
        type: String,
        required: true,
    },
    public_ids: {
        type: Array
    }
}, { timestamps: true });

const Concept = model('Concept', conceptSchema);

export default Concept;