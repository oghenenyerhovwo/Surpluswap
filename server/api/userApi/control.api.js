import express from "express";

import { getUsers, getUser, deleteUser, updateUser }from "./controllers/index.js";
import { isAuth, isNotBlocked, isVerified } from "../../utils/index.js"

const router = express.Router();

// get all users
router.get(
    "/", 
    isAuth,
    isNotBlocked,
    isVerified,
    async(req, res) => {
        getUsers(req,res)
    }
);

router.get(
    "/:id", 
    isAuth,
    isNotBlocked,
    isVerified,
    async(req, res) => {
        getUser(req, res)
    }
);

router.put(
    "/:id",
    isAuth,
    isNotBlocked,
    async(req, res) => {
        updateUser(req, res)
    }
);

router.delete(
    "/:id",
    isAuth,
    isNotBlocked,
    async(req, res) => {
        deleteUser(req, res)
    }
);


export default router;