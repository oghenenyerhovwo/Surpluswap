import express from "express"

//  importing objects and functions
import upload from '../../connections/storageConnection.js'

import { uploadImage } from "./controllers/index.js"

import { isAuth } from "../../utils/index.js"


const router = express.Router()


// upload image
router.post("/", 
    isAuth,
    upload.single('image'),
    async (req, res) => {
        uploadImage(req, res)
    }
);


export default router