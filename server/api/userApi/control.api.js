import express from "express";

import { getUsers, getUser, deleteUser, updateUser }from "./controllers/index.js";
import { isAuth } from "../../utils/index.js"

const router = express.Router();

// get all users
router.get(
    "/", 
    async(req, res) => {
        getUsers(req,res)
    }
);

router.get(
    "/:id", 
    isAuth,
    async(req, res) => {
        getUser(req, res)
    }
);

router.put(
    "/:id",
    isAuth,
    async(req, res) => {
        updateUser(req, res)
    }
);

router.delete(
    "/:id",
    isAuth,
    async(req, res) => {
        deleteUser(req, res)
    }
);


export default router;