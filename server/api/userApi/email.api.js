import express from "express";
import {isAuth} from "../../utils/index.js"

import { 
    signIn, 
    signUp, 
    resendEmail,
}from "./controllers/index.js";

const router = express.Router();

// sign in user
router.post(
    "/signin", (req, res) => {
        signIn(req, res)
});

// register user
router.post(
    "/signup", 
    (req, res) => {
        signUp(req, res)
});

// resend email
router.post(
    "/resend", 
    (req, res) => {
        resendEmail(req, res)
});
export default router;