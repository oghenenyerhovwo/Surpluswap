import express from "express";
import { isAuth } from "../../utils/index.js"

import { createStory, updateStory, deleteStory, addView, getStory, getStories, getStoriesMine, getStoriesWithLimit } from "./controllers/index.js";


const router = express.Router();

// get Story
router.get(
    "/", 
    (req, res) => {
        getStories(req, res)
});

// get Story with limit
router.get(
    "/limit/:limitNumber", 
    (req, res) => {
        getStoriesWithLimit(req, res)
});

// get Story for user
router.get(
    "/mine/:id", 
    (req, res) => {
        getStoriesMine(req, res)
});

// add view to story
router.put(
    "/view/:id", 
    isAuth,
    (req, res) => {
        addView(req, res)
});

// create Story
router.post(
    "/", 
    isAuth,
    (req, res) => {
        createStory(req, res)
});

router.get(
    "/:id", 
    (req, res) => {
        getStory(req, res)
});

router.put(
    "/:id", 
    isAuth,
    (req, res) => {
        updateStory(req, res)
});
// // get Produc
// // update Story
router.delete(
    "/:id", 
    isAuth,
    (req, res) => {
        deleteStory(req, res)
});


export default router;