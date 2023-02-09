import { Schema, model} from "mongoose";

const fineArtSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the title of this piece: "]
    },
    physicalType: {
        type: String,
        required: [true, "Please specify the type of Fine Art this is: "]
    },
    dimension: {
        type: String,
    },
    article: {
        type: String
    },
    piece: {
        type: String,
    },
    // creator: {
    //     type: String,
    //     required: true,
    // },
    public_id: {
        type: String
    }

}, { timestamps: true });

const FineArt = model('FineArt', fineArtSchema);

export default FineArt;