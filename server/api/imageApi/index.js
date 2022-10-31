import express from "express";
import imageRouter from "./image.api.js"

const router = express.Router();

router.use('/route', imageRouter);


export default router;