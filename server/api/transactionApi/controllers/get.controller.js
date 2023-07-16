import Transaction from "../../../models/transactionModel.js";

// get Transaction
export const getTransactions = async(req, res) => {
    try {
        const transactions= await Transaction
            .find()
            .populate("client")
            .sort({updatedAt: 1, createdAt: 1})
        res.send({transactions}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Transaction"})
    }
}

// get Transaction
export const getTransactionsMine = async(req, res) => {
    try {
        const user= req.user
        const transactions= await Transaction
            .find({client: user._id})
            .populate("client")
            .sort({updatedAt: -1, createdAt: -1})
        res.send({transactions}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get your Transaction"})
    }
}

// get Transaction
export const getTransaction = async(req, res) => {
    try { 
        res.send({transaction: req.transaction})
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Transaction not found"})
    }
}