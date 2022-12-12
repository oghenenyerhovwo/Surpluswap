import express from "express";
import commentRouter from "./comment.api.js"

const router = express.Router();

router.use('/route', commentRouter);


export default router; 