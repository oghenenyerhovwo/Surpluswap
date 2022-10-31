import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isVerified: {type: Boolean, default: false,},
    role: {
        type: String,
        default: "regular",
        enum: ["regular", "admin", "superAdmin"]
    },
    membership: {
        type: String,
        enum: ["Active", "Auxiliary"]
    },
    phoneNumber: {type: Object, unique: false},
    profilePic: {type: String,},
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    isCatholic: {type: Boolean},
    isBaptised: {type: Boolean},
    isCommunicant: {type: Boolean},
    isConfirmed: {type: Boolean},
    parish: {type: String},
    birthday: {type: Object},
}, {
    timestamps: true
});

const User= mongoose.model('User', userSchema);

export default User