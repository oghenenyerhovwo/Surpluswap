import express from "express";
import imageRouter from "./image.api.js"

const router = express.Router();

router.use('/image', imageRouter);


export default router;