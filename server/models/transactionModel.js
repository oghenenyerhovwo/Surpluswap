import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    type: {
        type: String,
        enum: ["buy", "sell"]
    },
    nairaAmount: {type: Number, required: true},
    rmbAmount: {type: Number, required: true},
    messageToAdmin: {type: String},
    messageToClient: {type: String},
    popAdmin: {type: Array},
    popClient: {type: Array},
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountDetails: {type: Object},
    clientAccountDetails: {type: Object},
    adminAccountDetails: {type: Object},
    dateAdmin: {type: Date},
    dateClient: {type: Date},
    dateCompleted: {type: Date},
    status: {
        type: String,
        default: "non-active",
        enum: [ 
            "non-active", 
            "pending-admin-approval", 
            "completed",  
            "rejected-by-admin",
            "approved-by-admin",
            "rejected-by-client",
        ]
    },
    editRole: {
        type: String,
        default: "client",
        enum: [ "client", "admin"]
    },

}, {
    timestamps: true
});

const Transaction= mongoose.model('Transaction', transactionSchema);

export default Transaction