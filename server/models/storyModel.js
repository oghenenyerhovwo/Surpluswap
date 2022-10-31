import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const storySchema = new Schema({
    content: {type: String, required: true},
    title: {type: String, required: true},
    subtitle: {type: String},
    video: {type: String},
    image: {type: String},
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    tags: {type: String},

}, {
    timestamps: true
});

const Story= mongoose.model('Story', storySchema);

export default Story