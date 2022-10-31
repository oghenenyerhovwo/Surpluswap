import express from "express";

import { getAllUsers, getUser, getUserById, deleteUser, updateUser }from "./controllers/index.js";
import { isAuth } from "../../utils/index.js"

const router = express.Router();

router.get(
    "/", 
    isAuth,
    async(req, res) => {
        getUser(req, res)
    }
);

// get all users
router.get(
    "/all", 
    async(req, res) => {
        getAllUsers(req,res)
    }
);

router.get(
    "/:id",
    async(req, res) => {
        getUserById(req, res)
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

// git subtree push --prefix server heroku master

export default router;