
import express from "express";
import { isAuth } from "../../utils/index.js"

import { createComment, deleteComment} from "./controllers/index.js";


const router = express.Router();

// create Comment
router.post(
    "/:storyId/", 
    isAuth,
    (req, res) => {
        createComment(req, res)
});

// router.get(
//     "/:id", 
//     (req, res) => {
//         getComment(req, res)
// });
// // get Produc
// // update Comment
router.delete(
    "/:storyId/:id", 
    isAuth,
    (req, res) => {
        deleteComment(req, res)
});


export default router;