import express from "express";
import eventRouter from "./event.api.js"

const router = express.Router();

router.use('/route', eventRouter);

export default router;