import express from "express";
import {isAuth} from "../../utils/index.js"

import { 
    signIn, 
    signUp, 
    confirmEmail,
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

// email confirmation route
router.post(
    "/confirmation",
    isAuth,
    (req, res) => {
        confirmEmail(req, res)
});

export default router;