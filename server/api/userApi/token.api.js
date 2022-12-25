import express from "express";
import {isAuth} from "../../utils/index.js"

import { 
    confirmToken,
    tokenSignIn,
}from "./controllers/index.js";

const router = express.Router();

// token confirmation route
router.get(
    "/confirmation",
    isAuth,
    (req, res) => {
        confirmToken(req, res)
});

// token sign in
router.get(
    "/signin",
    isAuth,
    (req, res) => {
        tokenSignIn(req, res)
});

export default router;