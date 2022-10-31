import express from "express";

import { GoogleSignIn } from "./controllers/index.js";

const router = express.Router();

// google and facebook signup/login route
router.post(
    "/google/signin",
    async (req, res) => {
        GoogleSignIn(req,res)
});


export default router;