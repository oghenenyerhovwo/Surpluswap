import express from "express";
import { isAuth } from "../../utils/index.js"

import { postImage } from "./controllers/index.js";


const router = express.Router();

// create image
router.post(
    "/", 
    isAuth,
    (req, res) => {
        postImage(req, res)
});


export default router;