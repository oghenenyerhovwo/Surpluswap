import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isVerified: {type: Boolean, default: false,},
    isBlocked: {type: Boolean, default: false,},
    role: {
        type: String,
        default: "client",
        enum: ["client", "admin"]
    },
    adminRole: {
        type: String,
        enum: ["regular", "super"]
    },
    phoneNumber: {type: Object, unique: true},
    phoneNumberText: {type: String, required: true},
    phoneNumberTextWithCode: {type: String, required: true},
}, {
    timestamps: true
});

const User= mongoose.model('User', userSchema);

export default User