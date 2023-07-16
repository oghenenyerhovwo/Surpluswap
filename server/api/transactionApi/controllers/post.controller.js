import Transaction from "../../../models/transactionModel.js";
import { isAdmin, isAuthor } from "../../../utils/index.js"

// create Transaction
export const createTransaction = async(req, res) => {
    try {
        const user= req.user

        const newTransaction = await Transaction.create({
            type: req.body.type,
            rmbAmount: req.body.rmbAmount,
            nairaAmount: req.body.nairaAmount,
            client: user._id,
        })

        res.send({id: newTransaction._id})  
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Transaction"})
    }
}

// update Transaction
export const updateTransaction = async(req, res) => {
    try {
        const transactionId= req.params.id
        const foundTransaction = req.transaction

        // checking if transaction has been completed
        if(foundTransaction.status === "completed"){
            return res.status(404).send({message: "Transaction has been completed already by client"})
        }

        // checking if update role is given to client
        if(foundTransaction.editRole !== "client"){
            return res.status(404).send({message: "Cannot edit this transaction"})
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId,{
            popClient: req.body.popClient || foundTransaction.popClient,
            clientAccountDetails: {
                paymentMethod: req.body.paymentMethod || (foundTransaction.clientAccountDetails && foundTransaction.clientAccountDetails.paymentMethod),
                paymentAccountNumber: req.body.paymentAccountNumber || (foundTransaction.clientAccountDetails && foundTransaction.clientAccountDetails.paymentAccountNumber),
            },
            adminAccountDetails: req.body.adminAccountDetails || foundTransaction.adminAccountDetails,
            messageToAdmin: req.body.messageToAdmin || foundTransaction.messageToAdmin || "",
            status: req.body.status || foundTransaction.status,
            editRole: "admin",
            dateClient: Date.now(),
        })
        return res.send({id: updatedTransaction._id}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update Transaction"})
    }
}

// update Transaction Admin
export const updateTransactionAdmin = async(req, res) => {
    try {
        const transactionId= req.params.id
        const foundTransaction = req.transaction

        if(!foundTransaction){
            return res.status(404).send({message: "Transaction not found"})
        }

        // checking if transaction has been completed
        if(foundTransaction.status === "completed"){
            return res.status(404).send({message: "Transaction has been completed already"})
        } 

        // checking if update role is given to admin
        if(foundTransaction.editRole !== "admin"){
            return res.status(404).send({message: "Admin is not allowed to respond"})
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId,{
            messageToClient: req.body.messageToClient || foundTransaction.messageToClient || "",
            status: req.body.status || foundTransaction.status,
            editRole: "client",
            popAdmin: req.body.popAdmin || foundTransaction.popAdmin ||  [],
            dateAdmin: Date.now(),
        })
        return res.send({id: updatedTransaction._id}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Transaction"})
    }
}

// delete Transaction
export const deleteTransaction = async(req, res) => {
    try {
        const transactionId = req.params.id
        const foundTransaction = req.transaction

        // checking if transaction is active
        if(foundTransaction.status !== "non-active"){
            return res.status(404).send({message: "Cannot delete an active transaction"})
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId, req.body)
        res.send({id: deletedTransaction._id})  
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Transaction"})
    }
}