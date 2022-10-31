import express from "express";
import productRouter from "./product.api.js"

const router = express.Router();

router.use('/route', productRouter);


export default router;