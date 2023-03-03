import { Schema, model} from "mongoose";

const translationSchema = new Schema({
    process: {
        type: Array,
    },
    public_ids: {
        type: Array,
    },
    article:{
        type: String,
    },
    characterDesign: {
        type: Schema.Types.ObjectId,
        required: true,
        // ref: 'CharacterDesign'
    },
    // creator: {
    //     type: String,
    //     required: true,
    // },
}, {timestamps: true});

const Translation = model("Translation", translationSchema);

export default Translation;