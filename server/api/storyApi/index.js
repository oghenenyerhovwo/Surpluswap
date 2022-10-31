import express from "express";
import storyRouter from "./story.api.js"

const router = express.Router();

router.use('/route', storyRouter);


export default router;