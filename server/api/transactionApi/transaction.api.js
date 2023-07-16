import express from "express";
import Transaction from "../../models/transactionModel.js";
import { isAuth, isNotBlocked, isVerified, isAdmin } from "../../utils/index.js"

import { 
    createTransaction, 
    getTransaction, 
    getTransactions, 
    updateTransaction,
    getTransactionsMine,
    deleteTransaction,
    updateTransactionAdmin,
} from "./controllers/index.js";


const router = express.Router();

const isTransaction = async (req, res, next) => {
    const transactionId= req.params.id
    const transaction= await Transaction.findById(transactionId).populate("client")
    if(transaction){
        req.transaction = transaction
        next()
    } else {
        return res.status(404).send({message: "Transaction not found"})
    }
}

const isTransactionOwner = async (req, res, next) => {
    const user= req.user
    const client= req.transaction.client
    if(String(user._id) === String(client._id)){
      next()
    } else {
      res.status(401).send({message: "only owner of this transaction(s) can access them"})
    }
}

// get Transaction
router.get(
    "/", 
    isAuth,
    isNotBlocked,
    isVerified,
    isAdmin,
    (req, res) => {
        getTransactions(req, res)
});

// get only user's Transactions
router.get(
    "/mine", 
    isAuth,
    isNotBlocked,
    (req, res) => {
        getTransactionsMine(req, res)
});

// create Transaction
router.post(
    "/", 
    isAuth,
    isNotBlocked,
    isVerified,
    (req, res) => {
        createTransaction(req, res)
});

// get Transaction
router.get(
    "/:id", 
    isAuth,
    isNotBlocked,
    isVerified,
    isTransaction,
    isTransactionOwner,
    (req, res) => {
        getTransaction(req, res)
});

// get Transaction admin
router.get(
    "/:id/admin", 
    isAuth,
    isNotBlocked,
    isVerified,
    isAdmin,
    isTransaction,
    (req, res) => {
        getTransaction(req, res)
});

// update Transaction
router.put(
    "/:id", 
    isAuth,
    isNotBlocked,
    isVerified,
    isTransaction,
    isTransactionOwner,
    (req, res) => {
        updateTransaction(req, res)
});

// update Transaction admin
router.put(
    "/:id/admin", 
    isAuth,
    isNotBlocked,
    isVerified,
    isAdmin,
    isTransaction,
    (req, res) => {
        updateTransactionAdmin(req, res)
});

// delete Transaction
router.delete(
    "/:id", 
    isAuth,
    isNotBlocked,
    isVerified,
    isTransaction,
    isTransactionOwner,
    (req, res) => {
        deleteTransaction(req, res)
});

export default router;