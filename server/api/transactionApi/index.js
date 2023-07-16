import express from "express";
import transactionRouter from "./transaction.api.js"

const router = express.Router();

router.use('/route', transactionRouter);


export default router;