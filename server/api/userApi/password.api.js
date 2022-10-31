import express from "express";


import { isAuth } from "../../utils/index.js"
import { 
    resetPassword,
    getPasswordEmail,
}  from "./controllers/index.js";

const router = express.Router();

// Get password reset email
router.post(
    "/resetrequest",
    async (req, res) => {
        getPasswordEmail(req,res)
});

router.post(
    "/reset",
    isAuth,
    async (req, res) => {
        resetPassword(req,res)
});



export default router;