import express from "express";
import userRouter from "./userApi/index.js";
// import storyRouter from "./storyApi/index.js";
// import eventRouter from "./eventApi/index.js";
// import commentRouter from "./commentApi/index.js";
// import rentRouter from "./rentApi/index.js";
// import uploadRouter from "./fileUploadApi/index.js";
// import imageRouter from "./imageApi/index.js";

const router = express.Router();

router.use('/users', userRouter);
// router.use('/stories', storyRouter);
// router.use('/events', eventRouter);
// router.use('/comments', commentRouter);


export default router;