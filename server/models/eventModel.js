import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    text: {type: String, required: true},
    title: {type: String, required: true},
    videos: {type: Array},
    images: {type: Array},
    bannerImgs: {type: Array},
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
    date: {type: Object, required: true},

}, {
    timestamps: true
});

const Event= mongoose.model('Event', eventSchema);

export default Event